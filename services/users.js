const bcrypt = require('bcrypt');
const jwt = require('../modules/auth');
const usersRepo = require('../repositories/users');

const getAll = async () => {
  const data = await usersRepo.getAll();
  return data;
};

const getById = async (id) => {
  const data = await usersRepo.getById(id);
  return data;
};

const validPassword = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
};

const login = async (body) => {
  const data = await usersRepo.findByEmail(body.email);
  if (!data) {
    throw new Error('Email invalido');
  }
  if (!bcrypt.compareSync(body.password, data.password)) {
    throw new Error('Password invalido');
  } else {
    const userData = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      image: data.image,
      roleId: data.roleId,
    };
    const token = jwt.createToken(userData);
    return token;
  }
};

module.exports = {
  getAll,
  validPassword,
  getById,
  login
};
