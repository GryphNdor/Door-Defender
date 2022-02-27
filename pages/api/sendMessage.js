import twilio from 'twilio';

export default function sendMessage(req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, token);
  const { phone } = req.body
  console.log(req.body)

  client.messages
    .create({
      body: "A user has opened your door",
      from: '+15715543828',
      to: req.body
    }).then((message) => {
      res.status(200)
      console.log(message.body)
    })
    .catch(

      res.status(500)
    );
    console.log("sent message to " + req.body);

}