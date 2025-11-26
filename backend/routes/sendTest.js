const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // <- points to root .env
const sgMail = require("@sendgrid/mail");

console.log("API Key:", process.env.SENDGRID_API_KEY); // Should now print the key

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sgMail
  .send({
    to: "pilaresjoshuel@gmail.com",
    from: process.env.FROM_EMAIL,
    subject: "Test Email",
    text: "This is a test",
  })
  .then(() => console.log("✅ Email sent"))
  .catch((err) => console.error(err.response ? err.response.body : err));
