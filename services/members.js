const membersRepository = require('../repositories/members');

const getAll = async () => {
  const members = await membersRepository.getAll();
  return members;
};

const createNew = async () => { 

  await membersRepository.createNew();
}

module.exports = {
  getAll,
  createNew
};
