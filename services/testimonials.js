const testimonialsRepo = require('../repositories/testimonials');

const getAll = async () => {
  const data = await testimonialsRepo.getAll();
  return data;
};

const getById = async (params) => {
  const id = params.id;
  const data = await testimonialsRepo.getById(id);
  if (!data) {
    const error = new Error('The testimonial does not exist.');
    throw error;
  }
  return data;
};

const update = async (params, body) => {
  const id = params.id;
  const data = await testimonialsRepo.update(id, body);
  return data;
};

module.exports = {
  getAll,
  getById,
  update
};
