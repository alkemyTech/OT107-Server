/* eslint-disable prefer-destructuring */
const categoriesRepository = require('../repositories/categories');
const newsRepository = require('../repositories/news');
const paginationModule = require('../modules/paginationModule');

const limit = 10;
const getAll = async (page, protocol, host, baseUrl) => {
  const countCategories = await categoriesRepository.count();

  const pagination = paginationModule.pagination(
    limit,
    countCategories,
    {
      page, protocol, host, baseUrl
    },
  );
  const categories = await categoriesRepository.getPages(
    limit,
    pagination.offset
  );
  const response = {
    count: countCategories,
    lastPage: pagination.lastPage,
    previousPage: pagination.previousPageUrl,
    nextPage: pagination.nextPageUrl,
    data: categories
  };
  return response;
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
