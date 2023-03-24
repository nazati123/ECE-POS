const axios = require('axios');
const ck = require('ckey');
const dkim = require('dkim');
const fs = require('fs');
const http = require('http');
var nodemailer= require('nodemailer');
const prompt = require('prompt-sync')({sigint: true});

const SB_URL = 'http://localhost:8080';
const REQ_SUB = 'request_submitted.html';
const REQ_REV = 'request_review.html';

const dkimKey = {
  privateKey: ck.DKIM_PRIVATE_KEY,
  keySelector: ck.DKIM_KEY_SELECTOR,
  domainName: ck.DKIM_DOMAIN
};

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


async function order_awaiting(orderID) {
  var url = SB_URL;
  id_string = orderID.toString();
  url += '/orders/' + id_string
  axios.get(url).then(response => {
    req_recipient = response.data.email;
    fac_recipients = response.data.facultyEmails.split(',');
    console.log('emails going to: ');
    fac_recipients.forEach(function (email) {
      console.log(email);
    });
    console.log(req_recipient);
    // send the email
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
      res.end('Email sent.');
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