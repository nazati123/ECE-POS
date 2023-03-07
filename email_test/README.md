# email_test
Trevor Russell's folder for getting the email application together.

## Email templates
.html files can be viewed in a web browser.
### request_submitted.html / request_submitted.mjml
Email template to be sent out once a request is received.

### status_update.html / status_update.mjml
Email template for order updates.

## Node.js testing
Can currently be executed with `node apiTest.js`
### apiTest.js
Work-in-progress applciation that makes a simple HTTP request to the Spring Boot application running from ECE-POS-API. The Node.js project is currently configured with this file as main.

### index.js
Proof-of-concept application for sending emails from node.js. Email credentials are not stored in-repo, so this cannot run without a local .env file. This also includes a query to the database outside of Spring Boot, which will be phased out of later versions.