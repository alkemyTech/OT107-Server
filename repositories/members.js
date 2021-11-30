const Models = require('../models');

const getAll = async () => {
  const data = await Models.Members.findAll();
  return data;
};
module.exports = {
  getAll
};
