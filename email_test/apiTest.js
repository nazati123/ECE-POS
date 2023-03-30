const axios = require('axios');
const ck = require('ckey');
const dkim = require('dkim');
const fs = require('fs');
const http = require('http');
var nodemailer= require('nodemailer');
const prompt = require('prompt-sync')({sigint: true});

// MAKE THIS FALSE TO STOP SENDING EMAILS
const SEND_EMAILS = true;

// URL to Spring Boot Instance
const SB_URL = 'http://localhost:8080';

// Filenames for email templates
const REQUEST_SUB = 'request_submitted.html';
const REQUEST_REV = 'request_review.html';
const STATUS_UPDATE = 'status_update.mjml';

const dkimKey = {
  privateKey: ck.DKIM_PRIVATE_KEY,
  keySelector: ck.DKIM_KEY_SELECTOR,
  domainName: ck.DKIM_DOMAIN
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

function personalizeMessage(message, type, order_data) {
  switch(type) {
    case 'submitted':
      order_id = order_data.id.toString();
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
      message = message.replace('#ID', '#' + order_id).replace('#APPROVER', recipient_string)
      // FIXME add the link to the button
      break;
    case 'review':
      req_name = order_data.requestPerson;
      message = message.replace('#REQUESTER_NAME', req_name)
      // FIXME add the link to the button
      break;
    case 'authorized':
      message = message.replace('#ID', '#' + order_id).replace('#STATUS', most_recent);
      console.log('please finish update case for personaliztaion');
      break;
    case 'ordered':
      console.log('ordered');
      break;
    case 'completed':
      console.log('completed');
      break;
    default:
      console.log('unexpected case')
  };
  return message
};

async function order_awaiting(orderID) {
  var url = SB_URL;

  id_string = orderID.toString();
  url += '/orders/' + id_string;

  axios.get(url).then(response => {
    console.log(response.data)
    // read in email addresses from order id
    req_recipient = response.data.email;

    // THIS MAKES FACULTYEMAILS AN ARRAY FROM HERE ON OUT
    response.data.facultyEmails = response.data.facultyEmails.split(',');
    fac_recipients = response.data.facultyEmails;

    console.log('emails going to: ');
    fac_recipients.forEach(function (email) {
      console.log(email);
    });
    console.log(req_recipient);

    // requester gets notification that the request was submitted
    fs.readFile(REQUEST_SUB, 'utf-8', (err, message) => {
      if (err) throw error;

      subject_line = 'ECE-POS: Request Submitted';

      message = personalizeMessage(message, 'submitted', response.data);

      // THIS LINE MAKES THIS EMAIL GO TO TREVOR FOR TESTING
      response.data.email = 'twrussell@crimson.ua.edu';

      if (SEND_EMAILS) {
        sendMail(response.data.email, subject_line, message); 
      }
      console.log('sent submitted to ' + response.data.email);
    })

    // faculty get an email notification of a new order awaiting
    fs.readFile(REQUEST_REV, 'utf-8', (err, message) => {
      if (err) throw error;

      subject_line = 'ECE-POS: New Request Awaiting Review';

      message = personalizeMessage(message, 'review', response.data);

      // THIS LINE MAKES THIS EMAIL GO TO TREVOR FOR TESTING
      response.data.facultyEmails = ['twrussell@crimson.ua.edu'];

      response.data.facultyEmails.forEach(function (email) {
        if (SEND_EMAILS) sleep(1000).then(() => {sendMail(email, subject_line, message);});
        console.log('sent review to ' + email)
      })
    })
    
  }).catch(error => {
    console.error(error)
  })
};

async function order_update(orderID, update) {
  // idea: check for latest TRUE value between authorized, ordered, and complete to give the most recent status update.
  // check time of update to avoid redundant emails that don't actually show progress. Check if there's a tracking number
  // to see if that should be in there.
  var url = SB_URL;
  
  id_string = orderID.toString();
  url += '/orders/' + id_string;

  axios.get(url).then(response => {
    console.log(response.data)

    // only requester gets an update email? double check this
    recipient = response.data.email;

    console.log('email going to: ');
    console.log(recipient);

    // requester gets notification that the request was submitted
    fs.readFile(STATUS_UPDATE, 'utf-8', (err, message) => {
      if (err) throw error;

      subject_line = 'ECE-POS: Status Update';

      message = personalizeMessage(message, update, response.data);

      // THIS LINE MAKES THIS EMAIL GO TO TREVOR FOR TESTING
      response.data.email = 'twrussell@crimson.ua.edu';

      if (SEND_EMAILS) {
        sendMail(response.data.email, subject_line, message); 
      }
      console.log('sent submitted to ' + response.data.email);
    })
  }).catch(error => {
    console.error(error)
  })
};

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/order-awaiting') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
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

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});