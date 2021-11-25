const Models = require('../models');

const getAll = async() => {
	const data = await Models.Contacts.findAll();
	return data; 
};

module.exports = {
	getAll
};