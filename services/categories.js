/* eslint-disable prefer-destructuring */
const categoriesRepository = require('../repositories/categories');

const getAll = async () => {
  const categories = categoriesRepository.getAll();
  return categories;
};

const getById = async (id) => {
  const category = await categoriesRepository.getById(id);
  if (!category) {
    const error = new Error('La categoria no existe!');
    error.status = 404;
    throw error;
  }
  return category;
};

const create = (body) => {
  const name = body.name;
  const category = categoriesRepository.getByName(name);
  if (category) {
    const error = new Error('Category already exists.');
    throw error;
  }
  return categoriesRepository.create(body);
};

module.exports = {
  getAll,
  getById,
  create
};
