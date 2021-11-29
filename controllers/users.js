const usersService = require("../services/users");

const getAll = async (req, res, next) => {
  try {
    const data = await usersService.getAll();
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
};