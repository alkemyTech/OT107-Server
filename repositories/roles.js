const Roles = require("../models/roles");

const getAll = async () => {
  const data = await Roles.findAll();
  return data;
};

module.exports = {
    getAll,
};
