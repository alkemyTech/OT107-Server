const db = require('../models');

const getAll = async () => {
  const data = await db.Activities.findAll();
  return data;
};

const create = async (body, req, res) => {
  const data = await db.Activities.create(body);
  return data;
};

const update = async (id, body) => {
  const data = await db.Activities.update(body, {
    where: { id }
  });
  return data;
};

const getById = async (id) => {
  const activity = await db.Activities.findByPk(id);
  return activity;
};

module.exports = {
  getAll,
  create,
  update,
  getById
};
