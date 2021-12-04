/* eslint-disable consistent-return */
const categoriesService = require('../services/categories');

const getAll = async (req, res, next) => {
  try {
    const categories = await categoriesService.getAll();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const category = await categoriesService.getById(req.params.id);
    res.status(200).json({ category });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const category = await categoriesService.create(req.body);
    return res.status(200).json({
      msg: `Category created: ${req.body.name}`,
      category
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create
};
