const auth = require('../modules/auth');

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
  

module.exports = {  
	verifyToken,
	decodeUserToken
}; 