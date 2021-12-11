const Models = require('../models');

const getAll = async () => {
  const data = await Models.Testimonials.findAll({
    attributes: ['name', 'image', 'content']
  });
  return data;
};

const getById = async (id) => {
  const data = await Models.Testimonials.findByPk(id, {
    attributes: ['id', 'name', 'image', 'content']
  });
  return data;
};

const create = async (body) => {
  const data = await Models.Testimonials.create(body);
  return data;
};

const update = async (id, body) => {
  const data = await Models.Testimonials.update(body, {
    where: { id }
  });
  return data;
};

const remove = async (id) => {
  const data = await Models.Testimonials.destroy({
    where: { id }
  });
  return data;
};

const getPages = async (limit, offset) => {
  const testimonials = await Models.Testimonials.findAll({
    attributes: {
      exclude: ['deletedAt', 'createdAt', 'updatedAt']
    },
    limit,
    offset
  });
  return testimonials;
};

const count = async () => {
  const data = await Models.Testimonials.count();
  return data;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  count,
  getPages
};
