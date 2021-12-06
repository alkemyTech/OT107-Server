const organizationRepository = require('../repositories/organizations');

const getOrganizationPublic = async (id) => {
  const data = await organizationRepository.getOrganizationPublic(id);
  return data;
};

const getById = async (id) => {
  const data = await organizationRepository.getById(id);
  return data;
};

const update = async (id, body) => {
  await organizationRepository.update(id, body);
  const data = await organizationRepository.getOrganizationAllData(id);
  return data;
};

module.exports = {
  getOrganizationPublic,
  update,
  getById
};
