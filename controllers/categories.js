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
    const category = await categoriesService.create(req.body);
    return res.status(200).json({
      msg: `Category created: ${req.body.name}`,
      category
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const category = await categoriesService.update(req.params.id, req.body);
    res.status(200).json({
      msg: `Category ${req.params.id} is updated succesfully`,
      category
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  update
};
