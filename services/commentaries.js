const commentariesRepo = require('../repositories/commentaries');

const create = async (NoveltyID, comment) => {
  const newComment = {
    user_id: 0,
    novelty_id: NoveltyID,
    body: comment,
  };
  const data = await commentariesRepo.create(newComment);
  return data;
};

const getAll = async () => {
  const data = await commentariesRepo.getAll();
  return data;
};

const getByNoveltyID = async (NoveltyID) => {
  const data = await commentariesRepo.getAll();
  const commentaries = data.map((cmm) => cmm.novelty_id === NoveltyID);
  return commentaries;
};

module.exports = {
  getAll,
  getByNoveltyID,
  create,
};
