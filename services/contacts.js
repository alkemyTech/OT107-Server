const contactsRepository = require('../repositories/contacts');

const getAll = async () => {
  const contacts = await contactsRepository.getAll();
  return contacts;
};

const create = async (body) => {
  const contact = await contactsRepository.create(body);
  return contact;
};

module.exports = {
  getAll,
  create
};
