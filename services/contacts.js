const contactsRepository = require('../repositories/contacts');
const contactEmail = require('../modules/sendContactEmail');

const getAll = async () => {
  const contacts = await contactsRepository.getAll();
  return contacts;
};

const create = async (body) => {
  const contact = await contactsRepository.create(body);
  await contactEmail.send(
    contact.dataValues.email,
    contact.dataValues.name,
  );
  return contact;
};

module.exports = {
  getAll,
  create
};
