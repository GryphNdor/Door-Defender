import twilio from 'twilio';

export default function sendMessage(req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, token);
  const { phone } = req.body 
  // console.log(phone, message);
  
  client.messages
    .create({
      body: "A user has opened your door",
      from: '+15715543828',
      to: phone,
    }).then((message) => console.log(message.body))
    .catch(); 
}