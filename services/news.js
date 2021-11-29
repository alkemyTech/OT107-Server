const newsRepository = require('../repositories/news');

const getAll = async () => {
  try {
    const news = await newsRepository.getAll();

    return news;
  } catch (e) {
    throw new Error('bad request');
  }
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
