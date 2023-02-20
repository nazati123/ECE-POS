const dotenv = require('dotenv')
var nodemailer= require('nodemailer')
const bufferjs = require('bufferjs')
const fs = require('fs')
const ck = require('ckey');


function sendMail(to, subject, message) {

  const transporter = nodemailer.createTransport({
    service: ck.EMAIL_SERVICE,
    auth: {
      user: ck.EMAIL_USERNAME,
      pass: ck.EMAIL_PASSWORD
    }
  })

  const options = {
    from: ck.EMAIL_USERNAME,
    to,
    subject,
    html: message,
  }

  transporter.sendMail(options, (error, info) => {
    if (error)
      console.log(error)
    else
      console.log(info)
  })

}

async function content(path){
  return fs.readFile(path, 'utf-8', (err, message) => {
    if (err) throw err;
    else process(message);
  })
};

function process(data){
  sendMail("twrussell03@gmail.com", "Test", data)
}

(async function() {
  msg = await content('email_template.html')
})();
