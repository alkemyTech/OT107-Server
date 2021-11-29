const models = require('../models/index');

const getAll = async () => {
  const data = await models.Roles.findAll();
  return data;
};

const getByName = async (name) => {
  const data = await models.Roles.findOne({ where: { name } });
  const roleInfo = {
    id: data.dataValues.id,
    name: data.dataValues.name,
    content: data.dataValues.content
  };
  return roleInfo;
};

module.exports = {
  getAll,
  getByName,
};
