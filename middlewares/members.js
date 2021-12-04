const { check, validationResult } = require('express-validator');

const membersValidation = [check('name')
  .notEmpty()
  .withMessage('A name is required')
  .isAlpha()
  .withMessage('The name must contain only letters')
  .bail(),

(req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) { res.status(400).send(validationErrors); }

  next();
}
];

module.exports = { membersValidation };
