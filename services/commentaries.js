const commentariesRepo = require("../repositories/commentaries");

const getByNoveltyID = async (novelty_id) => {
  const data = await commentariesRepo.getAll({
    attributes: ['novelty_id', 'body']
  });
  const commentaries = data.map((cmm) => cmm.novelty_id == novelty_id);
  return commentaries;
};


module.exports = {
  getByNoveltyID,
};
