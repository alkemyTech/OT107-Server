const { check, validationResult } = require('express-validator');
const filesModule = require('../modules/filesHandler');

const organizationInputValidation = [
  check('name')
    .notEmpty()
    .withMessage('Name is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  }
];

module.exports = {
  organizationInputValidation
};
