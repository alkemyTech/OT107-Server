const { check, validationResult } = require('express-validator');
const filesModule = require('../modules/filesHandler');

const organizationInputValidation = [
  check('name')
    .notEmpty()
    .withMessage('name is required'),

  check('image')
    .notEmpty()
    .withMessage('image is required')
    .custom((value) => {
      filesModule.isImage(value);
      return true;
    }),

  check('phone', 'must be a valid phone number').isNumeric(),

  check('email')
    .isEmail()
    .withMessage('must be a valid email')
    .notEmpty()
    .withMessage('email is required'),

  check('welcomeText')
    .notEmpty()
    .withMessage('welcomeText is required'),

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
