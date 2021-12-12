const membersRepository = require('../repositories/members');
const paginationmModule = require('../modules/paginationModule');

const limit = 10;

const getAll = async (page, protocol, host, baseUrl) => {
  const countMembers = await membersRepository.count();

  const pagination = paginationmModule.pagination(
    limit,
    countMembers,
    {
      page, protocol, host, baseUrl
    },
  );
  const members = await membersRepository.getPages(
    limit,
    pagination.offset
  );
  const response = {
    countMembers,
    lastPage: pagination.lastPage,
    previousPage: pagination.previousPageUrl,
    nextPage: pagination.nextPageUrl,
    data: members
  };
  return response;
};

const create = async (body) => {
  const member = await membersRepository.create(body);
  return member;
};

const remove = async (id) => {
  await membersRepository.remove(id);
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
  remove,
  update,
  getById
};
