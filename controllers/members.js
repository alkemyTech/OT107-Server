const membersService = require('../services/members');

const getAll = async (req, res, next) => {
	try {
		const members = await membersService.getAll();
		res.status(200).json(members);
	}catch(e){
	}
};

module.exports = {
	getAll
};