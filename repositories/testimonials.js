const Models = require('../models');

const getAll = async () => {
  const data = await Models.Testimonials.findAll({
    attributes: ['name', 'image', 'content']
  });
  return data;
};

const getById = async (id) => {
  const data = await Models.Testimonials.findByPk(id, {
    attributes: ['name', 'image', 'content']
  });
  return data;
};

const create = async (name, image, content) => {
  const data = await Models.Testimonials.create({
    name,
    image,
    content
  });
  return data;
};

const update = async (id, name, image, content) => {
  const data = await Models.Testimonials.update(
    {
      name,
      image,
      content
    },
    { where: { id } }
  );
  return data;
};

module.exports = {
  getAll,
  getById,
  create,
  update
};
