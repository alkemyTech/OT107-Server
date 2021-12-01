const models = require('../models/index');

const getAll = async () => {
  try {
    const news = await models.News.findAll();

    return news;
  } catch (e) {
    throw new Error('bad request');
  }
};

const create = async (data) => {
  try {
    const newNews = await models.News.create(data);

    return newNews;
  } catch (error) {
    throw new Error('bad request');
  }
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
