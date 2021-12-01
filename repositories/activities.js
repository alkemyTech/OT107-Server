const db = require('../models');

const getAll = async () => {
  const data = await db.activities.findAll();
  return data;
};

const create = async (body, req, res) => {
  const data = await db.activities.create(body);
  return data;
};

module.exports = {
  getAll,
  create
};
