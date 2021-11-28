const registerService = require('../services/register');

const register = async (req, res, next) => {
    try {
      const user = await registerService.register(req.body);
      res.status(200).json({ data: user });
    } catch (e) {
      next(e);
    }
  };
  
  module.exports = {
    register
  };