const Models = require("../models");

const getAll = async () => {
  const data = await Models.Commentaries.findAll();
  return data;
};

const create = async (comment) => {
  const data = await Models.Commentaries.create({...comment});
  const comment = await data;
  return comment
}
module.exports = {
  getAll,
  create,
};
