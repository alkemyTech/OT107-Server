const { check, validationResult } = require('express-validator');

const loginInputValidation = [
    check('email').exists().isEmail(),
    check('password').exists().not().isEmpty()
, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    next();
    }
]

module.exports = {
    loginInputValidation
}