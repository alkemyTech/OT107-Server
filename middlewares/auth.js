const { check, validationResult } = require('express-validator');
const router = require('express').Router();

const loginUsersValidator = router.post('/login', [
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Invalid Password').not().isEmpty()
], async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    next()
});
module.exports = {
    loginUsersValidator
}