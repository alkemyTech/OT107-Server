const Models = require('../models');

const getAll = async () => {
  const data = await Models.Contacts.findAll();
  return data;
};

const create = async (body) => {
  const contact = await Models.Contacts.create(body);
  return contact;
};

module.exports = {
  getAll,
  create
};
