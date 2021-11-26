const userService =  require('../services/users');
const securityService =  require('../services/tokenSecurity');
const rolesService =  require('../services/roles');

const  isOwnUser = async (req, res, next) => {

	try {

		const userId = req.body.id;
		const userTokenId = securityService.verifyToken(req);   
		const user = await userService.getById(userTokenId);
		const adminUser = await rolesService.getByName('Admin');

		if (user.dataValues.roleId === adminUser.id) return next();
		if (Number.parseInt(userId) === user.id) return next();

		const e = new Error('You are not authorized to perform this operation.');
		throw e;
		
	} catch (e) {
		next(e);
	}
};

module.exports = {
	isOwnUser
};