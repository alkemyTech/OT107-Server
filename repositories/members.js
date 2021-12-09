const Models = require('../models');

const getAll = async () => {
  const members = await Models.Members.findAll();
  return members;
};
const getPages = async (limit, offset) => {
  const members = await Models.Members.findAll({
    attributes: {
      exclude: ['facebookUrl', 'instagramUrl', 'linkedinUrl', 'image', 'description', 'deletedAt', 'createdAt', 'updatedAt']
    },
    limit,
    offset
  });
  return members;
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

const getById = async (memberId) => {
  const member = await Models.Members.findOne({ where: { id: memberId } });
  return member;
};

const remove = async (memberId) => {
  await Models.Members.destroy({ where: { id: memberId } });
};

const count = async () => {
  const data = await Models.Members.count();
  return data;
};

module.exports = {
  getAll,
  create,
  remove,
  update,
  getById,
  count,
  getPages
};
