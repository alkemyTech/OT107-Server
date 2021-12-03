const Models = require('../models');

const getAll = async () => {
  const data = await Models.Testimonials.findAll({
    attributes: ['name', 'image', 'content']
  });
  return data;
};

const create = async (body) => {
  const data = await Models.Testimonials.create(body);
  return data;
};

module.exports = {
  getAll,
  create
};
