const commentsService = require('../services/comments');

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const comment = await commentsService.create(
      data.user_id,
      data.novelty_id,
      data.comment
    );
    if (comment) {
      res.status(200).json({ message: 'Posted succesfully!' });
    }
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const commentaries = await commentsService.getAll();
    res.status(200).json({ commentaries });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  getAll,
};