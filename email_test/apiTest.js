const axios = require('axios');
const prompt = require('prompt-sync')({sigint: true});

async function getFacultyEmails(url, orderID) {
  id_string = orderID.toString();
  url += '/orders/' + id_string
  axios.get(url).then(response => {
    recipients = response.data.facultyEmails.split(',')
    console.log(recipients)
    return
  }).catch(error => {
    console.error(error)
  })
};

url = 'http://localhost:8080';
orderID = +prompt();

(async function() {
  getFacultyEmails(url, orderID)
})();