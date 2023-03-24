const http = require('http');
const axios = require('axios');
const prompt = require('prompt-sync')({sigint: true});


async function getFacultyEmails(url, orderID) {
  id_string = orderID.toString();
  url += '/orders/' + id_string
  axios.get(url).then(response => {
    recipients = response.data.facultyEmails.split(',')
    console.log('emails going to: ');
    console.log(recipients)
  }).catch(error => {
    console.error(error)
  })
};

const server = http.createServer((req, res) => {
  sb_url = 'http://localhost:8080';

  if (req.method === 'POST' && req.url === '/order-awaiting') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const order = JSON.parse(body);
      const id = order.id;

      console.log(`received ${id}`);
      getFacultyEmails(sb_url, id);
      res.writeHead(200);
      res.end('Email will be sent.');
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