const slidesServices = require('../services/slides');

const getAll = async (req, res, next) => {
  try {
    const slides = await slidesServices.getAll();
    res.status(200).json(slides);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const slide = await slidesServices.getById(id);
    res.status(200).json(slide);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById
};
