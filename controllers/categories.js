const Categories = require('../services/categories');

const getAll = async (req, res, next) => {
  try {
    const categories = await Categories.getAll();
    res.status(200).json(categories);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
};
