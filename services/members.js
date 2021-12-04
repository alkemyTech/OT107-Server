const membersRepository = require('../repositories/members');

const getAll = async () => {
  const members = await membersRepository.getAll();
  return members;
};

const create = async (body) => {
  const member = await membersRepository.create(body);
  return member;
};

const update = async (id, body) => {
  const member = await membersRepository.update(id, body);
  return member;
};

const memberById = async (id) => {
  const member = await membersRepository.memberById(id);
  return member;
};

const remove = async (id) => {
  await membersRepository.remove(id);
};

module.exports = {
  getAll,
  create,
  update,
  memberById,
  remove
};
