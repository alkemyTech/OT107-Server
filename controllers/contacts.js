const contactsService = require('../services/contacts');

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsService.getAll();
    res.status(200).json(contacts);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const contact = await contactsService.create(req.body);
    res.status(200).json(contact);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  create
};
