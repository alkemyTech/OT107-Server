const { check, validationResult } = require('express-validator');
const filesModule = require('../modules/filesHandler');

const newsInputValidation = [
  check('name').exists().notEmpty().isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
  check('content').exists().notEmpty().isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
  check('categoryId').exists().notEmpty().isNumeric().withMessage('must be numeric'),
  (req, res, next) => {
    const errors = validationResult(req);
    const files = req.files || false;
    const image = files.image || false;

    if (!image) {
      errors.errors.push(
        {
          msg: 'Image file is required',
          param: 'image',
          location: 'files'
        }
      );
    }
    if (image && !filesModule.isImage(image.name)) {
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
