const testimonialsRepo = require('../repositories/testimonials');

const getAll = async () => {
  const data = await testimonialsRepo.getAll();
  return data;
};

const create = async (body) => {
  const data = await testimonialsRepo.create(body);
  return data;
};

module.exports = {
  getAll,
  create
};
