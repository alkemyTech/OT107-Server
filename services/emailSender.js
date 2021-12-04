const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_KEY);

const send = async (email, template, subject) => {
  const message = {
    to: email,
    from: process.env.SENDGRID_MAIL,
    subject,
    html: template,
  };

  await sgMail.send(message);
};

module.exports = {
  send,
};
