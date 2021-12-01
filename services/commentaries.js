const commentariesRepo = require('../repositories/commentaries');


const create = async (NoveltyID, comment) => {
  const newComment = {
    user_id: 0,
    novelty_id: NoveltyID,
    body: comment
  };
  const data = await commentariesRepo.create(newComment);
  return data;
};

module.exports = {
  create,
};
