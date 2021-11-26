/* eslint-disable no-unused-vars */
const Models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const getAll = async () => {
	const data = await Models.Roles.findAll({
		attributes: ['name', 'image', 'content']
	});
	return data;
};

const getByName = async (name) => {
	const data = await Models.Roles.findOne({ where: { name : {[Op.substring]:name}}});
	const roleInfo = {
		id : data.dataValues.id,
		name : data.dataValues.name,
		content : data.dataValues.content
	};
	return roleInfo;
};


module.exports = {
	getAll,
	getByName
};