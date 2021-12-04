const { check, validationResult } = require('express-validator');
const membersService = require('../services/members');

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

const memberExist = [async (req, res, next) => {
  const member = await membersService.memberById(req.params.id);

  if (!member) { res.status(400).send('Not matching member'); }
  next();
}];

module.exports = { membersValidation, memberExist };
