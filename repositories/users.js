const Users = require("../models/users");

const getAll = async () => {
  const data = await Users.findAll();
  return data;
};

module.exports = {
  getAll,
};
