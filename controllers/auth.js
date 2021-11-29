const usersService = require('../services/users');

const login = async (req, res, next) => {
  try {
    const jwt = await usersService.login(req.body);
    if (!jwt) {
      res.status(401).json({ ok: 'false' });
    } else {
      res.status(200).json({ token: jwt });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  login
};