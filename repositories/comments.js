const Models = require('../models');

const getAll = async () => {
  const consult = await Models.Commentaries.findAll({
    attributes: ['user_id', 'novelty_id', 'body'],
  });
  const data = await consult;
  return data;
};

const create = async (comment) => {
  const response = await Models.Commentaries.create(comment);

  return response;
};

module.exports = {
  getAll,
  create,
};
