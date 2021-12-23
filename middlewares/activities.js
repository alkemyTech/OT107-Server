const { check, validationResult } = require('express-validator');

const activitiesInputValidation = [
  check('name', 'Activity Name Required').not().isEmpty().withMessage('Name is required'),
  check('content', 'Activity Content Required').not().isEmpty().withMessage('Content is required'),
  check('image', 'Activity Image Required').not().isEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  }
];

module.exports = {
  activitiesInputValidation
};
