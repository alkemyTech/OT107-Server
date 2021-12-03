const membersRepository = require('../repositories/members');

const getAll = async () => {
  const members = await membersRepository.getAll();
  return members;
};

const createNew = async (body) => { 

  const member = await membersRepository.createNew(body);
  return member 
}

module.exports = {
  getAll,
  createNew
};
