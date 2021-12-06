const { check, validationResult } = require('express-validator');
const commentsService = require('../services/comments');
const usersServices = require('../services/users');
const auth = require('../modules/auth');
const rolesServices = require('../services/roles');

const commentInputValidation = [
  check('comment').exists().not().isEmpty(),
  check('novelty_id').exists().not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
];

const isOwnComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const bearertoken = req.headers.authorization;

    if (!bearertoken) throw new Error('Access denied');

    const token = bearertoken.split(' ')[1];
    const usuarioToken = auth.decodeToken(token);

    const comment = await commentsService.getById(commentId);
    if (!comment) throw new Error('Invalid id');

    if (comment.user_id === usuarioToken.id) return next();

    const user = await usersServices.getById(usuarioToken.id);
    if (!user) throw new Error('Access denied');

    const adminUser = await rolesServices.getByName('Admin');
    if (user.dataValues.roleId === adminUser.id) return next();
    throw new Error('Access denied');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  commentInputValidation,
  isOwnComment
};
