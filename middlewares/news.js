const { check, validationResult } = require('express-validator');
const filesModule = require('../modules/filesHandler');

const newsInputValidation = [
  check('name').exists().notEmpty().isLength({ min: 3 }),
  check('content').exists().notEmpty().isLength({ min: 3 }),
  check('categoryId').exists().notEmpty().isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    const file = req.files.image;
    if (!filesModule.isImage(file.name)) {
      errors.errors.push(
        {
          msg: 'Invalid image extension',
          param: 'image',
          location: 'files'
        }
      );
    }
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  }
];

module.exports = {
  newsInputValidation
};
