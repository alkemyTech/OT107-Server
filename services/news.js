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

const update = async (id, body) => {
  const existNovelty = await newsRepository.getById(id);
  if (!existNovelty) throw new Error('bad request');

  // assignment news categoryId from Categories
  const newsCategory = await categoriesRepository.getByName('news');
  // eslint-disable-next-line no-param-reassign
  body.categoryId = newsCategory.id;
  const updateNovelty = await newsRepository.update(id, body);
  if (!updateNovelty) throw new Error('bad request');

  const novelty = await newsRepository.getById(id);
  return novelty;
};

const remove = async (id) => {
  const existNovelty = await newsRepository.getById(id);
  if (!existNovelty) throw new Error('bad request');

  await newsRepository.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
