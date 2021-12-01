const commentsRepo = require("../repositories/comments");

const create = async (UserID, NoveltyID, comment) => {
  const newComment = {
    user_id: UserID,
    novelty_id: NoveltyID,
    body: comment,
  };
  const data = await commentsRepo.create(newComment);
  return data;
};

module.exports = {
  create,
};
