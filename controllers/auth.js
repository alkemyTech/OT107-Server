const jwt = require('../modules/auth');
const usersService = require("../services/users");

const login = async (req, res, next) => {
	try {
		const user = await usersService.findByEmail(req.body.email);
        if(!userEmail){
            res.json({ok: "false"});
            return;
        }
        if(usersService.validPassword(req.body.password, user.password)){
            const token = jwt.createToken(user);
            res.status(200).json({token: token});
            return;
        } else {
            res.json({ok: "false"});
        }
	}catch(e){
		next(e);
	}
};

module.exports = {
	login
};