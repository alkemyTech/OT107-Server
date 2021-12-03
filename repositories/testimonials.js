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

const update = async (id, body) => {
  const data = await Models.Testimonials.update(body, {
    where: { id }
  });
  return data;
};

module.exports = {
  getAll,
  getById,
  update
};
