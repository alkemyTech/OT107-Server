const Sequelize = require('sequelize');
const Roles = require('../models/roles');

const { Op } = Sequelize;

const getAll = async () => {
  const data = await Roles.findAll();
  return data;
};

const getByName = async (name) => {
  const data = await Roles.findOne({ where: { name: { [Op.substring]: name } } });
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
