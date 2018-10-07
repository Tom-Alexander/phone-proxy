# phone-proxy

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Proxy SMS and voice calls using the twilio API. SMS that are sent to `FROM_NUMBER` are forwarded to `TO_NUMBER`. When `FROM_NUMBER` recieves a call, `TO_NUMBER` is dialed.

You will need to define the following environment variables:

|   Variable  |                 Description                 |
|:-----------:|:-------------------------------------------:|
| ACCOUNT_SID | Twilio account SID                          |
| AUTH_TOKEN  | Twilio auth token                           |
| TO_NUMBER   | The phone number you would like to proxy to |
| FROM_NUMBER | Your twilio phone number                    |
