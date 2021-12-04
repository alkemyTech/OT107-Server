const db = require('../models');

const getOrganizationPublic = async (id) => {
  const data = await db.Organization.findOne({
    where: { id },
    attributes: ['name', 'image', 'phone', 'address', 'urlFacebook', 'urlLinkedin', 'urlInstagram']
  });
  return data;
};

const update = async (id, body) => {
  const data = await db.Organization.update(body, {
    where: { id }
  });
  return data;
};

const getOrganizationAllData = async (id) => {
  const data = await db.Organization.findOne({
    where: { id }
  });
  return data;
};

module.exports = {
  getOrganizationPublic,
  update,
  getOrganizationAllData
};
