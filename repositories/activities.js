const db = require('../models');

const getAll = async () => {
  const data = await db.Activities.findAll();
  return data;
};

const create = async (body, req, res) => {
  const data = await db.Activities.create(body);
  return data;
};

module.exports = {
  getAll,
  create
};
