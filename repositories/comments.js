const Models = require('../models');

const getAll = async () => {
  const consult = await Models.Comments.findAll({
    attributes: ['body'],
    order: [['createdAt', 'ASC']]
  });
  return consult;
};

const getById = async (id) => {
  const comment = await Models.Comments.findByPk(id);
  return comment;
};

const create = async (comment) => {
  const response = await Models.Comments.create(comment);
  return response;
};

const update = async (id, data) => {
  const comment = await Models.Comments.update(data, { where: { id } });
  return comment;
};

const remove = async (id) => {
  await Models.Comments.destroy({ where: { id } });
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove
};
