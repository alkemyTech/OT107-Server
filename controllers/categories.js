const categoriesService = require('../services/categories');

const getAll = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const { protocol, baseUrl } = req;
    const host = req.get('host');
    const categories = await categoriesService.getAll(page, protocol, host, baseUrl);
    res.status(200).json(categories);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const category = await categoriesService.getById(req.params.id);
    res.status(200).json({ category });
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const category = await categoriesService.create(req.body);
    res.status(200).json({
      msg: `Category created: ${req.body.name}`,
      category
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    await categoriesService.remove(req.params.id);
    res.status(200).json({ msg: `Category ${req.params.id} removed succesfully` });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const category = await categoriesService.update(req.params.id, req.body);
    res.status(200).json(category);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update
};
