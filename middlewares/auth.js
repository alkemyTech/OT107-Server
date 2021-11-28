const userService =  require('../services/users');
const rolesService =  require('../services/roles');
const auth = require('../modules/auth');

const  isOwnUser = async (req, res, next) => {

	try {

		const userId = req.body.id;
		const userToken = req.headers['authorization'];
		const usuarioToken = auth.decodeToken(userToken);
		const userTokenId = usuarioToken.id;
		
		if(userTokenId){
			if (Number.parseInt(userId) === userTokenId) return next();
		}
		const user = await userService.getById(userTokenId);
		if(user){
			const adminUser = await rolesService.getByName('Admin');
			if (user.dataValues.roleId === adminUser.id) return next();
		}	
		const e = new Error('not authorized');
		throw e;
	} catch (e) {
		next(e);
	}
};

module.exports = {
	isOwnUser
};