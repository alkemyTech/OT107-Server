const usersRepo = require("../repositories/users");

const getAll = async (req, res, next) => {
  try {
    const data = await usersRepo.getAll();
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
};
