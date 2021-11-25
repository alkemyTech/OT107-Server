const db = require('../models');

const getOne = async (id) => {
  const data = await db.Organization.findOne({
    where: { id },
    attributes: ['name', 'image', 'phone', 'address']
  });
  return data;
};

module.exports = {
  getOne
};
