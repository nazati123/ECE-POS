# email_test
Trevor Russell's folder for getting the email application together.

## Email templates
.html files can be viewed in a web browser.

### .env
Email account credentials are stored in a local .env file, and must be updated to match whatever account is desired.

### request_submitted.html / request_submitted.mjml
Email template to be sent out once a request is received.

### request_review.html / request_review.mjml
Email template sent to faculty for the purpose of reviewing and approving an order.

### status_update.html / status_update.mjml
Email template for order updates.

## Node.js Server
Start server from terminal with `node index.js`, which listens on port 3000
### index.js
Handles email requests from Angular front end and sends out relevant updates to users.

