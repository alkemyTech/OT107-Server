const usersService = require('../services/users');
const rolesService = require('../services/roles');

const auth =  require('../modules/auth');

const decodeUserToken = (token) => {
	const tokenDecoded = auth.decodeToken(token);
	if (!tokenDecoded) {
		const e = new Error('Invalid token').status(401);
		throw e;
	}
	return tokenDecoded;
};

const verifyToken = (req) => {
	const userToken = req.headers['authorization'];
	if (!userToken) {
		const e = new Error('Token not found').status(401);
		throw e;
	}
	const usuarioToken = decodeUserToken(userToken);
	if(!usuarioToken) {
		const e = new Error('Invalid token').status(403);
		throw e;
	}
	return usuarioToken.id;

};

const checkOwnerPermissions = async (req, res, next) => {
	try {
		const userIdreq = req.params.id;
		const userTokenId = verifyToken(req);  
		const user = await usersService.getById(userTokenId);
		if (!user) {
			const e = new Error('not found').status(404);
			throw e;
		}
		// Warning :  El repositoriy  y service de roles aún no se han implementado.
		const role = await rolesService.getByName('Admin');
		if (!role) {
			const e = new Error('not found').status(404);
			throw e;
		}
		if (user.roleId === role.id) return next();
		if (Number.parseInt(userIdreq) === user.id)return next();
		const e = new Error('You are not authorized to perform this operation.').status(403);
		throw e;
	} catch (e) {
		next(e);
	}
};

module.exports = {
	checkOwnerPermissions
};