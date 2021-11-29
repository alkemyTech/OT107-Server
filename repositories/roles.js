const Sequelize = require('sequelize');
const models = require('../models/index');

const { Op } = Sequelize;

const getAll = async () => {
	const data = await Roles.findAll();
	return data;
};

const getByName = async (name) => {
  const data = await models.Roles.findOne({ where: { name: { [Op.substring]: name } } });
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
