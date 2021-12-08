/* eslint-disable prefer-destructuring */
const categoriesRepository = require('../repositories/categories');
const newsRepository = require('../repositories/news');

const getAll = async (page, limit) => {
  const offset = limit * (page - 1);
  const data = await categoriesRepository.getAll(offset, limit);
  if (page > 1) data.linkPrev = `/categories?page=${page - 1}&limit=${limit}`;
  if (data.count > offset + limit) data.linkNext = `/categories?page=${Number.parseInt(page, 10) + 1}&limit=${limit}`;
  return data;
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
