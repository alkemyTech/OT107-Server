const commentsRepository = require('../repositories/comments');

const create = async (user_id, novelty_id, comment) => {
  const newComment = {
    user_id,
    novelty_id,
    body: comment,
  };
  const data = await commentsRepository.create(newComment);
  return data;
};

const getAll = async () => {
  const data = await commentsRepository.getAll();
  return data;
};

const getByNoveltyID = async (novelty_id) => {
  const data = await commentsRepository.getAll();
  const commentaries = data.filter((cmm) => cmm.novelty_id === novelty_id);
  return commentaries;
};

module.exports = {
  getAll,
  getByNoveltyID,
  create,
};
