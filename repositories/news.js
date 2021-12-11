const models = require('../models/index');

const getAll = async () => {
  const news = await models.News.findAll();
  return news;
};

const getPages = async (limit, offset) => {
  const news = await models.News.findAll({
    attributes: {
      exclude: ['deletedAt', 'createdAt', 'updatedAt']
    },
    limit,
    offset
  });
  return news;
};

const count = async () => {
  const data = await models.News.count();
  return data;
};

const create = async (data) => {
  const novelty = await models.News.create(data);
  return novelty;
};

const getById = async (id) => {
  const novelty = await models.News.findByPk(id);
  return novelty;
};

const update = async (id, body) => {
  const novelty = await models.News.update(body, {
    where: {
      id
    },
  });


  return novelty;
};

const remove = async (id) => {
  await models.News.destroy({
    where: {
      id
    },
  });
};

const getByCategoryId = async (categoryId) => {
  const response = await models.News.findAll({ where: { categoryId } });
  return response;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getByCategoryId,
  getPages,
  count
};
