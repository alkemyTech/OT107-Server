const categoriesService = require('../services/categories');

const getAll = async (req, res, next) => {
  try {
    const categories = await categoriesService.getAll();
    res.status(200).json(categories);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const response = await categoriesService.create(req.body);
    return res.status(200).json({
      msg: `Category created: ${req.body.name}`,
      Category: response
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create
};
