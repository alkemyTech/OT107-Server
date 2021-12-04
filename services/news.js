const newsRepository = require('../repositories/news');
const categoriesRepository = require('../repositories/categories');

const getAll = async () => {
  const news = await newsRepository.getAll();
  return news;
};

const create = async (data) => {
  // assignment news categoryId from Categories
  const newsCategory = await categoriesRepository.getByName('news');
  // eslint-disable-next-line no-param-reassign
  data.categoryId = newsCategory.id;

  const novelty = await newsRepository.create(data);

  if (!novelty) throw new Error('bad request');
  return novelty;
};

const getById = async (id) => {
  const novelty = await newsRepository.getById(id);
  if (!novelty) throw new Error('bad request');
  return novelty;
};

const update = async () => {

};

const remove = async () => {

};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
