const db = require('../models');

const getAll = async () => {
  const allCategories = await db.categories.findAll({
    attributes: ['name']
  });
  return allCategories;
};
const getById = async (id) => {
  const category = await db.categories.findByPk(id);
  return category;
};
const getByName = async (name) => {
  const category = await db.categories.findOne({ where: { name } });
  return category;
};
const create = async (body) => {
  const category = await db.categories.create(body);
  return category;
};
const remove = async (id) => {
  await db.categories.destroy({ where: { id } });
};
const update = async (id, data) => {
  const category = await db.categories.update(data, { where: { id } });
  return category;
};

module.exports = {
  getAll,
  getByName,
  getById,
  create,
  remove,
  update
};
