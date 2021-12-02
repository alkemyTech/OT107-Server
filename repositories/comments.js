const Models = require('../models');

const getAll = async () => {
  const consult = await Models.Comments.findAll({
    attributes: ['body'],
    order: ['createdAt', 'ASC']
  });
  return consult;
};

const create = async (comment) => {
  const response = await Models.Comments.create(comment);
  return response;
};

module.exports = {
  getAll,
  create,
};
