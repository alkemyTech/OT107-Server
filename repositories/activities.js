const db = require('../models');

const getAll = async () => {
  const data = await db.activities.findAll();
  return data;
};

module.exports = {
  getAll
};
