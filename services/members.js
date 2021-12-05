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
  const memberVerified = await membersRepository.getById(id);

  if (!memberVerified) {
    throw new Error('Not matching member');
  }
  const member = await membersRepository.update(id, body);
  return member;
};

const getById = async (id) => {
  const member = await membersRepository.getById(id);
  return member;
};

module.exports = {
  getAll,
  create,
  update,
  getById
};
