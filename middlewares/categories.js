const expressValidator = require('express-validator');

const categoriesInputValidation = [
  expressValidator.check('name')
    .notEmpty()
    .withMessage('You must provide a category name.')
    .bail()
    .isAlpha()
    .withMessage('The name can only contain letters.')
    .bail(),
  (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  categoriesInputValidation
};
