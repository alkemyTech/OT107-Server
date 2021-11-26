const organizationRepository = require('../repositories/organizations');

const getOrganizationPublic = async (id) => {
  const data = await organizationRepository.getOrganizationPublic(id);
  return data;
};

module.exports = {
  getOrganizationPublic
};
