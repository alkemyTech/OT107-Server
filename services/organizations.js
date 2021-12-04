const organizationRepository = require('../repositories/organizations');

const getOrganizationPublic = async (id) => {
  const data = await organizationRepository.getOrganizationPublic(id);
  return data;
};

const update = async (id, body) => {
  const data = await organizationRepository.update(id, body);
  return data;
};

const getOrganizationAllData = async (id) => {
  const data = await organizationRepository.getOrganizationAllData(id);
  return data;
};

module.exports = {
  getOrganizationPublic,
  update,
  getOrganizationAllData
};
