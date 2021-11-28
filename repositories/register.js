const db = require('../models');
const bcrypt = require('bcrypt');


const register = async (body, req, res) => {
  body.password = bcrypt.hashSync(body.password,10);
  const data = await db.User.create(body);
  return data;
};

module.exports = {
    register
};

