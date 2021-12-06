const { check, validationResult } = require('express-validator');

const contactsInputValidation = [
  check('name', 'Name Required').exists().not().isEmpty(),
  check('email', 'Invalid Email').isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
];

module.exports = {
  contactsInputValidation,
};
