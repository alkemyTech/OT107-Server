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
const create = async (req, res, next) => {
  try {
    const user = await usersService.create(req.body);
    res.status(200).json({
      user
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  login,
  create
};