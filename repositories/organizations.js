const db = require('../models');

const getOrganizationPublic = async (id) => {
  const data = await db.Organization.findOne({
    where: { id },
    attributes: ['name', 'image', 'phone', 'address', 'urlFacebook', 'urlLinkedin', 'urlInstagram'],
    include: [{
      model: db.Slides,
      as: 'Slides',
      where: { organizationId: id },
      order: [
        ['order', 'ASC']
      ]
    }]
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

const getById = async (id) => {
  const data = await db.Organization.findByPk(id);
  return data;
};

module.exports = {
  getOrganizationPublic,
  update,
  getOrganizationAllData,
  getById
};
