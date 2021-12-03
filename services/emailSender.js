const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_KEY);

const send = async (email, template, subject) => {
  const message = {
    to: email,
    from: process.env.SENDGRID_MAIL,
    subject,
    html: template,
  };

  try {
    await sgMail.send(message);
  } catch (error) {
    const { body } = error.response;
    console.error(body);
  }
};

module.exports = {
  send,
};
