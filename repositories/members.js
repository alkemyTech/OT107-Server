const Models = require('../models');

const getAll = async(req,res) => {
	const data = await Models.Members.findAll();
	return data; 
};
module.exports = {
	getAll
};