const Models = require("../models");

const getAll = async () => {
  try {
    const consult = await Models.Commentaries.findAll({
      attributes: ['user_id', 'novelty_id', 'body']
    });
    const data = await consult;
    return data;
  } catch (e) {
    throw new Error("bad request");
  }
};


const create = async (comment) => {
  try {
    console.log(comment);
    const response = await Models.Commentaries.create({ ...comment });
    
    return response;
  } catch (e) {
    throw new Error("bad request");
  }
};

module.exports = {
  getAll,
  create,
};
