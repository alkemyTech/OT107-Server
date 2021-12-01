const slidesRepository = require('../repositories/slides');

const getAll = async () => {
  const slides = await slidesRepository.getAll();
  return slides;
};

module.exports = {
  getAll
};
