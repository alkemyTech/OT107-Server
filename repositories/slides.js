const db = require('../models');

const getAll = async () => {
  const slides = await db.Slides.findAll({
    attributes: ['imageUrl', 'order']
  });
  return slides;
};

module.exports = {
  getAll
};
