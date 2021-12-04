const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const emailSender = require('../services/emailSender');

const subject = 'Registro Exitoso';

const send = async (email, lastName, firstName) => {
  const viewPATH = path.join(__dirname, '..', 'views', 'welcomeEmail.ejs');
  const view = fs.readFileSync(viewPATH, 'utf8');
  const ejsView = ejs.compile(view);
  const template = ejsView({
    title: 'Somos Mas ORG',
    welcomeText: `¡Welcome ${lastName}, ${firstName}. 🥳!`,
  });
  await emailSender.send(email, template, subject);
};

module.exports = {
  send
};
