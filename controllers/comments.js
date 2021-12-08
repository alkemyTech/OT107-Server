const commentsService = require('../services/comments');

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const comment = await commentsService.create(data);
    if (comment) {
      res
        .status(200)
        .json({ comment: comment.body, createdAt: comment.createdAt });
    }
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const comments = await commentsService.getAll();
    res.status(200).json({ comments });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const bodyUpdate = req.body;
    const comment = await commentsService.update(req.params.id, bodyUpdate);
    res.status(200).json({ comment });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    await commentsService.remove(req.params.id);
    res.status(204).json({ message: 'Commentario eliminado' });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  getAll,
  update,
  remove
};
