const Models = require('../models');

const getAll = async () => {
	const data = await Models.Testimonials.findAll({
		attributes: ['name', 'image', 'content']
	});
	return data;
};

module.exports = {
	getAll
};