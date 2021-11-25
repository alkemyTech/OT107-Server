const organizationRepository = require('../repositories/organizations');

const getOne = async (id) => {
  const data = await organizationRepository.getOne(id);
  return data;
};

module.exports = {
  getOne
};
