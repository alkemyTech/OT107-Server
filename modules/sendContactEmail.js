const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const emailSender = require('../services/emailSender');
const organizationService = require('../services/organizations');
const config = require('../config/config');

const subject = 'Confirmación de contacto';

const send = async (email, name) => {
  const org = await organizationService.getById(config.idOrganization);
  const viewPATH = path.join(__dirname, '..', 'views', 'contactEmail.ejs');
  const view = fs.readFileSync(viewPATH, 'utf8');
  const ejsView = ejs.compile(view);
  const template = ejsView({
    org,
    name
  });
  await emailSender.send(email, template, subject);
};

module.exports = {
  send
};
