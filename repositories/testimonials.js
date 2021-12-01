const Models = require('../models');

const getAll = async () => {
  const data = await Models.Testimonials.findAll({
    attributes: ['name', 'image', 'content']
  });
  return data;
};

const create = async (body) => {
  const { name, image, content } = body;
  const data = await Models.Testimonials.create({
    name,
    image,
    content
  });
  return data;
};

module.exports = {
  getAll,
  create
};
