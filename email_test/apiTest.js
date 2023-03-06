const axios = require('axios');

async function getFacultyEmails(url, orderID) {
  id_string = orderID.toString();
  url += '/orders/' + id_string
  axios.get(url).then(response => {
    return [response.data.facultyEmail1, response.data.facultyEmail2];
  }).catch(error => {
    console.error(error)
  })
};

url = 'http://localhost:8080';
orderID = 0;

console.log(await getFacultyEmails(url, orderID));