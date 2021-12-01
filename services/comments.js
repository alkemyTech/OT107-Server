const commentsRepository = require("../repositories/comments");

const create = async (user_id, novelty_id, comment) => {
  const newComment = {
    user_id,
    novelty_id,
    body: comment,
  };
  const data = await commentsRepository.create(newComment);
  return data;
};

module.exports = {
  create,
};
