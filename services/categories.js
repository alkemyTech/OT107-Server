const categoriesRepository = require('../repositories/categories');

const getAll = async () => {
  const categories = categoriesRepository.getAll();
  return categories;
};

const create = async (body) => {
  const name = body.name;
  const category = await categoriesRepository.getByName(name);
  if (category) {
    const error = new Error('Category already exists.');
    throw error;
  }
  return await categoriesRepository.create(body);
};

module.exports = {
  getAll,
  create
};
