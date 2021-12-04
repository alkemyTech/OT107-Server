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

module.exports = {
  getOrganizationPublic
};
