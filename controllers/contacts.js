const contactsService = require('../services/contacts.js');

const getAll = async (req, res, next) => {
	try {
		const contacts = await contactsService.getAll();
		res.status(200).json({
			data: contacts
		});
	}catch(e){
		next(e);
	}
};

module.exports = {
	getAll
};