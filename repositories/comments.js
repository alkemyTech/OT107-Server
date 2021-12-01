const Models = require("../models");

const create = async (comment) => {
  try {
    console.log(comment);
    const response = await Models.Comments.create({ ...comment });
    
    return response;
  } catch (e) {
    throw new Error("bad request");
  }
};

module.exports = {
  create,
};