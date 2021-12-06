const db = require('../models');

const getAll = async () => {
  const slides = await db.Slides.findAll({
    attributes: ['imageUrl', 'order']
  });
  return slides;
};

const getById = async (id) => {
  const slide = await db.Slides.findOne({
    where: { id }
  });
  return slide;
};

const create = async (newSlide) => {
  const slide = await db.Slides.create(newSlide);
  return slide;
};

const getLastOrder = async () => {
  const lastOrder = await db.Slides.max('order');
  return lastOrder;
};

const update = async (id, body) => {
  const slide = await db.Slides.update(body, {
    where: { id }
  });
  return slide;
};

const remove = async (id) => {
  const slide = await db.Slides.destroy({
    where: { id }
  });
  return slide;
};

module.exports = {
  getAll,
  getById,
  getLastOrder,
  create,
  update,
  remove
};
