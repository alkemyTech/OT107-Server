const commentsRepository = require('../repositories/comments');

const create = async (comment) => {
  const newComment = {
    user_id: comment.user_id,
    novelty_id: comment.novelty_id,
    body: comment.body,
  };
  const data = await commentsRepository.create(newComment);
  return data;
};

const getAll = async () => {
  const data = await commentsRepository.getAll();
  return data;
};

const getById = async (id) => {
  const data = await commentsRepository.getById(id);
  return data;
};

const update = async (id, bodyUpdate) => {
  const data = await commentsRepository.update(id, bodyUpdate);
  return data;
};

module.exports = {
  getAll,
  create,
  update,
  getById
};
