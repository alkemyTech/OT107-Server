const organizationRepo = require('../repositories/organizations');

const getAll = async () => {
  const data = await organizationRepo.getAll();
  return data;
};

module.exports = {
  getAll
};
