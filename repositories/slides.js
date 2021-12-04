const db = require('../models');

const getAll = async () => {
  const slides = await db.Slides.findAll({
    attributes: ['imageUrl', 'order']
  });
  return slides;
};

const remove = async (id) => {
  const slide = await db.Slides.destroy({
    where: { id }
  });
  return slide;
};

const getById = async (id) => {
  const slide = await db.Slides.findOne({
    where: { id }
  });
  return slide;
};

const update = async (id, body) => {
  const slide = await db.Slides.update(body, {
    where: { id }
  });
  return slide;
};

module.exports = {
  getAll,
  remove,
  getById,
  update
};
