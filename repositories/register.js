const bcrypt = require('bcrypt');
const db = require('../models');

const register = async (body, req, res) => {
  body.password = bcrypt.hashSync(body.password, 10);
  const data = await db.Users.create(body);
  return data;
};

module.exports = {
  register
};
