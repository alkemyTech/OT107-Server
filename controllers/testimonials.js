const testimonialsService = require('../services/testimonials');

const getAll = async(req, res, next) => {
	try {
		const data = await testimonialsService.getAll();
		res.status(200).json(data);
	} catch (e) {
		next(e);
	}
};

module.exports = {
	getAll
};