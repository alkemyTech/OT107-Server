const membersRepository = require('../repositories/members');

const getAll = async () => {
  const members = await membersRepository.getAll();
  return members;
};

const create = async (body) => {
  const member = await membersRepository.create(body);
  return member;
};

const remove = async (id) => {
  await membersRepository.remove(id);
};

module.exports = {
  getAll,
  create,

  remove
};
