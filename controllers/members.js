const membersService = require('../services/members');

const getAll = async (req, res, next) => {
	try {
		const members = await membersService.getAll();
		res.status(200).json(members);
	}catch(e){ next(e)
	}
};

const create = async (req,res,next) => { 

	try{const members = await  membersService.create(req.body); 
	res.status(200).json(members)}catch(e){	
		next(e)
	}
}

module.exports = {
	getAll,
	create
};