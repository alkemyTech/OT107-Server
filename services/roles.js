const rolesRepository = require('../repositories/roles');

const getByName = async (name) => {
  const data = await rolesRepository.getByName(name);
  const roleInfo = {
    id: data.dataValues.id,
    name: data.dataValues.name,
    content: data.dataValues.content
  };
  return roleInfo;
};

module.exports = {
  getByName
};
