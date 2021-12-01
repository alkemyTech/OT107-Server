const testimonialsRepo = require('../repositories/testimonials');

const getAll = async () => {
  const data = await testimonialsRepo.getAll();
  return data;
};

const create = async (name, image, content) => {
  const data = await testimonialsRepo.create(name, image, content);
  return data;
};

module.exports = {
  getAll,
  create
};
