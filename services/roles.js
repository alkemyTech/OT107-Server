const rolesRepository = require('../repositories/roles');

const getByName = async (name) => {
  const data = await rolesRepository.getByName(name);
  return data;
};

module.exports = {
  getByName
};
