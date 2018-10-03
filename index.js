const Twilio = require('twilio');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const client = new Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const empty = () => {
  const messagingResponse = new Twilio.twiml.MessagingResponse();
  return messagingResponse.toString();
};

const receive = (req, res) => {
  return client.messages
    .create({ to: process.env.TO_NUMBER, body: `Relayed: ${req.body.Body}`, from: process.env.FROM_NUMBER })
    .then(() => res.send(empty()))
    .catch((err) => {
      console.error(err);
      res.send(empty());
    });
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/sms', receive);
app.get('/', (_, res) => res.send('Alive'));
app.listen(process.env.PORT);


