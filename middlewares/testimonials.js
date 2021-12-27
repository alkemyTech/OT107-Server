const { check, validationResult } = require('express-validator');

const inputValidation = [
  check('name').exists().not().isEmpty().withMessage('Name is required'),
  check('content').exists().not().isEmpty().withMessage('Content is required'),
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
