const { check, validationResult } = require('express-validator');

const inputValidation = [
  check('name').exists().not().isEmpty(),
  check('content').exists().not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  }
];

module.exports = {
  inputValidation
};
