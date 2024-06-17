const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeMail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: "vivekbhimani.tst@gmail.com",
      subject: "This is my first creation",
      text: `Welcome to app, ${name}.Let me know how you get along with app.`,
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendWelcomeMail;
