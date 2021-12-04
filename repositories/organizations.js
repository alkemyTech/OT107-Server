const db = require('../models');

const getOrganizationPublic = async (id) => {
  const data = await db.Organization.findOne({
    where: { id },
    attributes: ['name', 'image', 'phone', 'address', 'urlFacebook', 'urlLinkedin', 'urlInstagram']
  });
  return data;
};

module.exports = {
  getOrganizationPublic
};
