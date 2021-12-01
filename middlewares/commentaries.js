const { check, validationResult } = require("express-validator");

const commentInputValidation = [
  check("comment").exists().not().isEmpty(),
  check("novelty_id").exists().not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
];

module.exports = {
  commentInputValidation,
};
