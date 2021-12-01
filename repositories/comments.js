const Models = require("../models");

const create = async (comment) => {
  const response = await Models.Comments.create(comment);
  return response;
};

module.exports = {
  create,
};
