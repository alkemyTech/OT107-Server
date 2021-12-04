const Models = require('../models');

const getAll = async () => {
  const data = await Models.Members.findAll();
  return data;
};

const create = async (body) => {
  const data = await Models.Members.create(
    body
  );

  return data;
};

module.exports = {
  getAll,
  create
};
