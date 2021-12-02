const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const sendEmail = require('./emailSender');

const send = async (email) => {
  const viewPATH = path.join(__dirname, '..', 'views', 'index.ejs');
  const view = fs.readFileSync(viewPATH, 'utf8');
  const ejsView = ejs.compile(view);
  const template = ejsView({
    title: 'Somos Mas ORG',
    welcomeText: ' Welcome 🥳 !!',
  });
  sendEmail.send(email, template);
};

module.exports = {
  send
};
