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

const create = async (req, res, next) => {
  try {
    const slide = await slidesServices.create(req.files.image, req.body);
    res.status(200).json(slide);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const slide = await slidesServices.update(id, req.body);
    res.status(200).json(slide);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await slidesServices.remove(id);
    res.status(200).json({ msg: 'slide remove successfully' });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
