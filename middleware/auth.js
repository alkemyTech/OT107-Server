const { check, validationResult } = require('express-validator');



const router = require('express').Router();

const registerUsersValidator = router.post('/', [
    check('firstName', 'First Name Required').not().isEmpty(),
    check('lastName', 'Last Name Required').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Invalid Password').not().isEmpty()
], async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    next();

});

module.exports = {
    registerUsersValidator
}


