const axios = require('axios');

// Make a GET request to a Spring Boot API endpoint
axios.get('http://localhost:8080/items')
  .then(response => {
    // Parse the response and use the data
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });