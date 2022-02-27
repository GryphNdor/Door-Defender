import twilio from 'twilio';

export default function sendMessage(req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, token);

  const fullSend = async () => {
    const { phone } = await req.body
    client.messages
      .create({
        body: "A user has opened your door",
        from: '+15715543828',
        to: phone
      }).then((message) => {
        res.status(200)
        console.log(message.body)
      })
      .catch();

  }
  fullSend()
  res.status(500)
}