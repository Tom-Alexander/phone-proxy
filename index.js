const Twilio = require('twilio');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const client = new Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const empty = () => {
  const messagingResponse = new Twilio.twiml.MessagingResponse();
  return messagingResponse.toString();
};

const sms = (req, res) => {
  return client.messages
    .create({ to: process.env.TO_NUMBER, body: req.body.Body, from: process.env.FROM_NUMBER })
    .then(() => res.send(empty()))
    .catch((err) => {
      console.error(err);
      res.send(empty());
    });
};

const voice = (req, res) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const dial = twiml.dial({ callerId: process.env.TO_NUMBER });
  dial.number(process.env.TO_NUMBER);
  res.type('text/xml');
  res.send(twiml.toString());
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/sms', sms);
app.post('/voice', voice);
app.get('/', (_, res) => res.send('Alive'));
app.listen(process.env.PORT);


