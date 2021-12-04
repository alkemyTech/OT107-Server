const slidesServices = require('../services/slides');

const getAll = async (req, res, next) => {
  try {
    const slides = await slidesServices.getAll();
    res.status(200).json(slides);
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
  remove
};
