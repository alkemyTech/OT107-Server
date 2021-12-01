const membersService = require('../services/members');

const getAll = async (req, res, next) => {
	try {
		const members = await membersService.getAll();
		res.status(200).json(members);
	}catch(e){ next(e)
	}
};

const createNew = async (req,res,next) => { 

	try{ membersService.createNew(); 
	res.status(200)}catch(e){
		next(e)
	}
}

module.exports = {
	getAll,
	createNew
};