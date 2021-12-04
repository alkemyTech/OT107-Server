const Models = require('../models');

const getAll = async () => {
  const data = await Models.Members.findAll();
  return data;
};

const create = async (body) => {
  const data = await Models.Members.create(
    body
  );

  return data;
};
const update = async (memberid, body) => {
  const data = await Models.Members.update(body, { where: { id: memberid } });
  return data;
};

const memberById = async (memberId) => {
  const member = await Models.Members.findOne({ where: { id: memberId } });
  return member;
};

module.exports = {
  getAll,
  create,
  update,
  memberById
};
