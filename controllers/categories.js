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

const remove = async (req, res, next) => {
  try {
    await categoriesService.remove(req.params.id);
    res.status(200).json({ msg: `Category ${req.params.id} removed succesfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  remove
};
