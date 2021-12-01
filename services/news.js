const newsRepository = require('../repositories/news');
const categoriesRepository = require('../repositories/categories');

const getAll = async () => {
  const news = await newsRepository.getAll();
  return news;
};

const create = async (data) => {
  const validData = data;
  // assignment news categoryId from Categories
  const newsCategory = await categoriesRepository.getByName('news');
  validData.categoryId = newsCategory.id;

  const newNews = await newsRepository.create(validData);

  return newNews;
};

const getById = async () => {

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
