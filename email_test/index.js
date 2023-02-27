var nodemailer= require('nodemailer')
const fs = require('fs')
const ck = require('ckey')
const dkim = require('dkim')

const { Client } = require('pg')
const client = new Client({
  user: ck.PG_USER,
  host: ck.PG_HOST,
  password: ck.PG_PASSWORD,
  database: ck.PG_DATABASE,
  port: ck.PG_PORT
})

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

}

async function content(path, id, fac_email){
  return fs.readFile(path, 'utf-8', (err, message) => {
    if (err) throw err;
    message = message.replace('NUM', id).replace('APPROVAL_NAME', fac_email)
    process(message);
  })
};

function process(data){
  sendMail("twrussell@crimson.ua.edu", "Test", data)
}

(async function() {
  client.connect()
  client.query(`SELECT fac_email_1 FROM order_form WHERE id=0`, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res.rows[0].fac_email_1)
    content('email_template.html', 0, res.rows[0].fac_email_1)
  })

  //msg = await content('email_template.html')
})();
