const db = require('../models');

const getOrganizationPublic = async (id) => {
  const data = await db.Organization.findOne({
    where: { id },
    attributes: ['name', 'image', 'phone', 'address']
  });
  return data;
};

module.exports = {
  getOrganizationPublic
};
