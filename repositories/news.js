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
  console.log('id',id)
  console.log('body',body)
  const novelty = await models.News.update(body, {
    where: {
      id
    },
  });

  console.log('novelty', novelty);
  return novelty;
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
