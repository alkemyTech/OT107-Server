const Models = require('../models/index');

const getAll = async () => {
  const data = await  Models.Users.findAll({
      attributes:['firstName','email','image']
  });
  return data;
};

const findByEmail = async (email) => {
    const data = await Models.Users.findOne({ 
        where: { email: email } 
    });
    return data;
}

module.exports = {
  getAll,
  findByEmail
};