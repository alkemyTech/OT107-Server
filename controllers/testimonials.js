const testimonialsService = require('../services/testimonials');

const getAll = async (req, res, next) => {
  try {
    const data = await testimonialsService.getAll();
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const data = await testimonialsService.getById(req.params);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    await testimonialsService.update(req.params, req.body);
    const data = await testimonialsService.getById(req.params);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  update
};
