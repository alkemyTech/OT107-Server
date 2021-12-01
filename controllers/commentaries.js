const commentariesServices = require('../services/commentaries');

const createComment = async (req, res, next) => {
  try {
    const data = req.body;
    const comment = await commentariesServices.create(
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
    const commentaries = await commentariesServices.getAll();
    res.status(200).json({ commentaries });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createComment,
  getAll,
};
