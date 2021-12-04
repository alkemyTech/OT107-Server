const slidesRepository = require('../repositories/slides');

const getAll = async () => {
  const slides = await slidesRepository.getAll();
  return slides;
};

const remove = async (id) => {
  const slide = await slidesRepository.remove(id);
  if (!slide) throw new Error('slide no exist');
  return slide;
};

const getById = async (id) => {
  const slide = await slidesRepository.getById(id);
  if (!slide) throw new Error('slide no exist');
  return slide;
};

module.exports = {
  getAll,
  remove,
  getById
};
