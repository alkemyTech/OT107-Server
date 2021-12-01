const db = require('../models');

const getAll = async () => {
  const allCategories = await db.categories.findAll({
    attributes: ['name']
  });
  return allCategories;
};

const getByName = async (name) => {
  const data = await db.categories.findOne({ where: { name } });
  return data;
};

module.exports = {
  getAll,
  getByName,
};
