const { check, validationResult } = require('express-validator');
const filesModule = require('../modules/filesHandler');

const newsInputValidation = [
  check('name').exists().notEmpty().isLength({ min: 3 }),
  check('content').exists().notEmpty().isLength({ min: 3 }),
  check('image').exists().notEmpty().custom((value) => {
    filesModule.isImage(value);
    return true;
  }),
  check('categoryId').exists().notEmpty().isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  }
];

module.exports = {
  newsInputValidation
};
