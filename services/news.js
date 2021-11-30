const newsRepository = require('../repositories/news');

const getAll = async () => {
  const news = await newsRepository.getAll();
  return news;
};

const create = async () => {

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
