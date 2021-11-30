const models = require('../models/index');

const getAll = async () => {
  const data = await models.Roles.findAll();
  return data;
};

const getByName = async (name) => {
  const data = await models.Roles.findOne({ where: { name } });
  return data;
};

module.exports = {
  getAll,
  getByName,
};
