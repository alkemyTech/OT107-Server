const testimonialsRepo = require('../repositories/testimonials');

const getAll = async () => {
  const data = await testimonialsRepo.getAll();
  return data;
};

const getById = async (id) => {
  const data = await testimonialsRepo.getById(id);
  return data;
};

const create = async (name, image, content) => {
  const data = await testimonialsRepo.create(name, image, content);
  return data;
};

const update = async (id, name, image, content) => {
  const data = await testimonialsRepo.update(id, name, image, content);
  return data;
};

module.exports = {
  getAll,
  getById,
  create,
  update
};
