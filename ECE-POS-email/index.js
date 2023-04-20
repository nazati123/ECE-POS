// MUST 'npm install' ALL MODULES BELOW TO RUN SERVER
const axios = require('axios');
const ck = require('ckey');
const dkim = require('dkim');
const fs = require('fs');
const http = require('http');
var nodemailer= require('nodemailer');

// MAKE THIS FALSE TO STOP SENDING EMAILS
const SEND_EMAILS = true;

// API URL
const SB_URL = 'http://localhost:8080';
// Frontend URL
const POS_URL = 'http://localhost:4200';

// Filenames for email templates
const REQUEST_SUB = 'request_submitted.html';
const REQUEST_REV = 'request_review.html';
const STATUS_UPDATE = 'status_update.html';

const dkimKey = {
  privateKey: ck.DKIM_PRIVATE_KEY,
  keySelector: ck.DKIM_KEY_SELECTOR,
  domainName: ck.DKIM_DOMAIN
};

// Creates hash to protect authorization link
function hash(num1, num2, num3, num4) {
  // Hash based on MurmurHash3
  const m = 0x5bd1e995;
  const r = 24;
  let h1 = 0x8a2ae2ba ^ num1;
  let h2 = 0x8b3c113c ^ num2;
  let h3 = 0x2a17eb2c ^ num3;
  let h4 = 0x08c9d639 ^ num4;

  h1 = (h1 * m) >>> 0;
  h1 = (h1 ^ (h1 >>> 16)) >>> 0;
  h2 = (h2 * m) >>> 0;
  h2 = (h2 ^ (h2 >>> 16)) >>> 0;
  h3 = (h3 * m) >>> 0;
  h3 = (h3 ^ (h3 >>> 16)) >>> 0;
  h4 = (h4 * m) >>> 0;
  h4 = (h4 ^ (h4 >>> 16)) >>> 0;

  h1 = ((h1 * m) ^ h2) >>> 0;
  h2 = ((h2 * m) ^ h3) >>> 0;
  h3 = ((h3 * m) ^ h4) >>> 0;
  h4 = ((h4 * m) ^ h1) >>> 0;

  h1 = (h1 * m) >>> 0;
  h1 = (h1 ^ (h1 >>> r)) >>> 0;
  h2 = (h2 * m) >>> 0;
  h2 = (h2 ^ (h2 >>> r)) >>> 0;
  h3 = (h3 * m) >>> 0;
  h3 = (h3 ^ (h3 >>> r)) >>> 0;
  h4 = (h4 * m) >>> 0;
  h4 = (h4 ^ (h4 >>> r)) >>> 0;

  const hashHex = (h1 ^ h2 ^ h3 ^ h4).toString(16).padStart(32, '0');
  return hashHex.substring(24, 32);
}

// Sleep function used to stagger calls to sendMail
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// NodeMailer email function
function sendMail(to, subject, message) {

  const transporter = nodemailer.createTransport({
    service: ck.EMAIL_SERVICE,
    auth: {
      user: ck.EMAIL_USERNAME,
      pass: ck.EMAIL_PASSWORD
    },
    dkim: dkimKey
  })

  const options = {
    from: ck.EMAIL_USERNAME,
    to,
    subject,
    html: message
  }

  transporter.sendMail(options, (error, info) => {
    if (error)
      console.log(error)
    else
      console.log(info)
  })

};

// Edit email templates to include relevant information
function personalizeMessage(message, type, order_data, faculty_email='') {
  new_status = type.toUpperCase();
  id = order_data.id;
  order_id = id.toString();
  
  // split fields from timestamp in case token needs to be created from a hash
  const timestamp = order_data.dateCreated.split('-')
  const year = parseInt(timestamp[0])
  const month = parseInt(timestamp[1])
  const day = parseInt(timestamp[2])


  // build links to actual pages in the system
  requester_link = POS_URL + '/order-form/' + order_id

  switch(type) {
    case 'submitted':
      
      // handling formatting of faculty emails (1, 2, or 3+ emails are split by grammatical comma patterns)
      recipients = order_data.facultyEmails;
      recipient_string = recipients.pop();
      if (recipients.length > 0){
        if (recipients.length == 1) {
          recipient_string += ' and ' + recipients.pop();
        }
        else {
          while (recipients.length > 1) {
            recipient_string += ', ' + recipients.pop();
          }
          recipient_string += ', and ' + recipients.pop();
        }
      }

      // user sees order ID and faculty who received their request.
      message = message.replace('#ID', '#' + order_id).replace('#APPROVER', recipient_string).replace('#LINK', requester_link);
      break;
    case 'review':
      // create link security token
      token = hash(year, month, day, id)

      // add token and email into approval link
      approver_link = POS_URL + '/approve-order/' + order_id + `/${token}/${faculty_email}`;

      // add requester name
      req_name = order_data.requestPerson;

      // update fields in message
      message = message.replace('#REQUESTER_NAME', req_name).replace('#LINK', approver_link);
      break;
    case 'approved':
      message = message.replace('#ID', '#' + order_id).replace('#STATUS', new_status);

      // approved message
      next_steps = 'You will receive another email when your order has been placed.';
      message = message.replace('#NEXT_STEPS', next_steps).replace('#LINK', requester_link);
      break;
    case 'ordered':
      message = message.replace('#ID', '#' + order_id).replace('#STATUS', new_status);

      // ordered message
      next_steps = 'Shipping numbers will be visible online when available.';
      message = message.replace('#NEXT_STEPS', next_steps).replace('#LINK', requester_link);
      break;
    case 'completed':
      message = message.replace('#ID', '#' + order_id).replace('#STATUS', new_status);
      
      // completed message
      next_steps = 'You may now pick up your item at the delivery location.';
      message = message.replace('#NEXT_STEPS', next_steps).replace('#LINK', requester_link);
      break;
    default:
      console.log('unexpected case')
  };
  return message
};

// Called when order request is made and is awaiting review.
async function order_awaiting(orderID) {
  var url = SB_URL;

  id_string = orderID.toString();
  url += '/orders/' + id_string;

  // pull order info from Spring Boot API
  axios.get(url).then(response => {
    // read in email addresses from order id
    req_recipient = response.data.email;

    // THIS MAKES FACULTYEMAILS AN ARRAY FROM HERE ON OUT
    response.data.facultyEmails = response.data.facultyEmails.split(',');
    fac_recipients = response.data.facultyEmails;

    /* DEBUG MESSAGES
    console.log('emails going to: ');
    fac_recipients.forEach(function (email) {
      console.log(email);
    });
    console.log(req_recipient);
    */

    // read email template for a submitted request, send to requester
    fs.readFile(REQUEST_SUB, 'utf-8', (err, message) => {
      if (err) throw error;

      // update message with order info
      message = personalizeMessage(message, 'submitted', response.data);

      // THIS LINE MAKES THIS EMAIL GO TO TREVOR FOR TESTING
      response.data.email = 'twrussell@crimson.ua.edu';

      if (SEND_EMAILS) {
        sendMail(response.data.email, 'ECE-POS: Request Submitted', message);
      }
    })

    // faculty get an email notification of a new order awaiting
    fs.readFile(REQUEST_REV, 'utf-8', (err, message) => {
      if (err) throw error;

      // THIS LINE MAKES THIS EMAIL GO TO TREVOR FOR TESTING
      response.data.facultyEmails = ['twrussell@crimson.ua.edu'];

      response.data.facultyEmails.forEach(function (email) {
        newMessage = personalizeMessage(message, 'review', response.data, email);
        if (SEND_EMAILS) sleep(3000).then(() => {sendMail(email, 'ECE-POS: New Request Awaiting Review', newMessage);});
      })
    })
    
  }).catch(error => {
    console.error(error)
  })
};

// Called when order status is updated.
async function order_update(orderID, update) {
  var url = SB_URL;
  
  id_string = orderID.toString();
  url += '/orders/' + id_string;

  axios.get(url).then(response => {
    // only requester gets an update email
    recipient = response.data.email;

    // console.log('email going to: ');
    // console.log(recipient);

    // requester gets notification that the request was submitted
    fs.readFile(STATUS_UPDATE, 'utf-8', (err, message) => {
      if (err) throw error;

      subject_line = 'ECE-POS: Status Update';

      // see personalizeMessage for cases in various update statuses
      message = personalizeMessage(message, update, response.data);

      // THIS LINE MAKES THIS EMAIL GO TO TREVOR FOR TESTING
      response.data.email = 'twrussell@crimson.ua.edu';

      if (SEND_EMAILS) {
        sendMail(response.data.email, subject_line, message); 
      }
    })
  }).catch(error => {
    console.error(error)
  })
};

// Define server: can receive requests for new orders and order updates
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/order-awaiting') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      // new order request just has order id
      const order = JSON.parse(body);
      const id = order.id;

      console.log(`received ${id}`);
      await order_awaiting(id);
      res.writeHead(200);
      res.end('Emails sent.');
    });
  } else if (req.method === 'POST' && req.url ==='/order-update') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      // update request has id and update (authorized, ordered, completed)
      const payload = JSON.parse(body);
      const id = payload.id;
      const update = payload.update;

      console.log(`received update for ${id}`);
      await order_update(id, update);
      res.writeHead(200);
      res.end('Updates sent.')
    });
  } else {
    res.writeHead(404);
    res.end('Not found\n');
  }
});

const PORT = 3000;

// Run server.
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});