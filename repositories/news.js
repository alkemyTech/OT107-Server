const models = require('../models/index');

const getAll = async () => {
  const news = await models.News.findAll();
  return news;
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

};

const remove = async (id) => {
  await models.News.destroy({
    where: {
      id
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
