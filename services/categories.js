const categoriesRepository = require('../repositories/categories');

const getAll = async () => {
  const categories = categoriesRepository.getAll();
  return categories;
};

module.exports = {
  getAll
};
