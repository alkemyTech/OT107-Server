const Models = require('../models/index');

const getAll = async () => {
  const data = await Models.Users.findAll({
    attributes: ['firstName', 'email', 'image'],
  });
  return data;
};

const create = async (body, req, res) => {
  const data = await Models.Users.create(body);

  return data;
};
const getById = async (id) => {
  const user = await Models.Users.findByPk(id, {
    attributes: {
      exclude: ['password'],
    },
  });
  return user;
};

const findByEmail = async (userEmail) => {
  const data = await Models.Users.findOne({
    where: { email: userEmail },
    raw: true,
  });
  return data;
};

const deleteUser = async (id) => {
  await Models.Users.destroy({ where: { id } });
  return true;
};

module.exports = {
  getAll,
  getById,
  findByEmail,
  create,
  deleteUser
};
