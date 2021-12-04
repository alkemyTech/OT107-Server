const db = require('../models');

const getAll = async () => {
  const slides = await db.Slides.findAll({
    attributes: ['imageUrl', 'order']
  });
  return slides;
}

const remove = async (id) => {
  const slide = await db.Slides.destroy({
    where: { id }
  });
  return slide;
}

const getById = async (id) => {
  const slide = await db.Slides.findOne({
    where: { id }
  });
  return slide;
}

module.exports = {
  getAll,
  remove,
  getById
};
