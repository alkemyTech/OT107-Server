const bcrypt = require('bcrypt');
const jwt = require('../modules/auth');
const usersRepo = require('../repositories/users');

const getAll = async () => {
  const data = await usersRepo.getAll();
  return data;
};

const create = async (body) => {
  body.password = bcrypt.hashSync(body.password, 10);
  const data = await usersRepo.create(body);
  return data;
};

const getById = async (id) => {
  const data = await usersRepo.getById(id);
  return data;
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
  login,
  create
};
