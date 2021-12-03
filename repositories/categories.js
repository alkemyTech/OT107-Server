const db = require('../models');

const getAll = async () => {
  const allCategories = await db.categories.findAll({
    attributes: ['name']
  });
  return allCategories;
};

const getByName = async (name) => {

  const category = await db.categories.findOne({ where: { name } });
  return category;
};

const create = async (body) => {
  const category = await db.categories.create(body);
  return category;
};

module.exports = {
  getAll,
  getByName,
  create
};
