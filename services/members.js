const membersRepository = require('../repositories/members');

const getAll = async () => {
  const members = await membersRepository.getAll();
  return members;
};

const create = async (body) => {
  const member = await membersRepository.create(body);
  return member;
};

module.exports = {
  getAll,
  create
};
