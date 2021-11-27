const Models = require('../models/index');

const getAll = async () => {
  const data = await Models.Users.findAll({
    attributes: ['firstName', 'email', 'image']
  });
  return data;
};

const getById = async (id) => {
  const data = await Models.Users.findOne({
    where: { id },
    attributes: ['firstName', 'email', 'image']
  });
  return data;
};

module.exports = {
  getAll,
  getById
};
