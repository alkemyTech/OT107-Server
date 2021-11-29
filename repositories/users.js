const Models = require('../models/index');

const getAll = async () => {
  const data = await Models.Users.findAll({
    attributes: ['firstName', 'email', 'image']
  });
  return data;
};
const getById = async (id) => {
  const user = await Models.Users.findByPk(id, {
    attributes: {
      exclude: ['password']
    }
  });
  return user;
};

module.exports = {
  getAll,
  getById
};
