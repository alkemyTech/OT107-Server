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
const getById = async (id) => {
  const category = await db.categories.findByPk(id);
  return category;
};
const remove = async (id) => {
  const category = await db.categories.destroy({ where: { id } });
  return category;
};

module.exports = {
  getAll,
  getByName,
  create,
  getById,
  remove
};
