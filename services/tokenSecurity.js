const auth = require('../modules/auth');

const decodeUserToken = (token) => {
	return auth.decodeToken(token);
};

const verifyToken = (userToken) => {
	const usuarioToken = decodeUserToken(userToken);
	return usuarioToken.id;
};

module.exports = {  
	verifyToken,
	decodeUserToken
};