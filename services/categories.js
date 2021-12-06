/* eslint-disable prefer-destructuring */
const categoriesRepository = require('../repositories/categories');
const newsRepository = require('../repositories/news');

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

const create = async (body) => {
  const name = body.name;
  const category = await categoriesRepository.getByName(name);
  if (category) {
    const error = new Error('Category already exists.');
    throw error;
  }
  return categoriesRepository.create(body);
};

const remove = async (id) => {
  const category = await categoriesRepository.getById(id);
  if (!category) {
    const error = new Error(`The category ${id} does not exist.`);
    error.status = 404;
    throw error;
  }
  const news = await newsRepository.getByCategoryId(id);
  if (news.length) {
    const error = new Error(`You cannot delete the category: ${id}, it has news associated with it.`);
    error.status = 401;
    throw error;
  }
  await categoriesRepository.remove(id);
};

const update = async (id, body) => {
  const category = await categoriesRepository.getById(id);
  if (!category) {
    const error = new Error('La categoria no existe');
    error.status = 404;
    throw error;
  }
  await categoriesRepository.update(id, body);
  const categoryUpdate = await categoriesRepository.getById(id);
  return categoryUpdate;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update
};
