const categoriesRepository = require('../repositories/categories');

const getAll = async () => {
  const categories = categoriesRepository.getAll();
  return categories;
};

const create = async (body) => {
  const name = body.name;
  const category = await categoriesRepository.getByName(name);
  if (category) {
    const error = new Error('Category already exists.');
    throw error;
  }
  return await categoriesRepository.create(body);
};

const update = async (id, body) => {
  const category = await categoriesRepository.getById(id);
  if (!category) {
    const error = new Error('La categoria no existe');
    error.status = 404;
    throw error;
  }
  await categoriesRepository.update(id, body);
  const categoryUpdate = await categoriesRepository.getById(id);
  return categoryUpdate;
};

module.exports = {
  getAll,
  create,
  update
};
