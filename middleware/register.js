const { check, validationResult } = require('express-validator');
const registerRepository = require('../repositories/register');
const registerController = require('../controllers/register');


const router = require('express').Router();

const registerMiddelware = router.post('/', [
    check('firstName', 'First Name Required').not().isEmpty(),
    check('lastName', 'Last Name Required').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Invalid Password').not().isEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    registerRepository.register(req.body);
    res.json(req.body);

});

module.exports = {
    registerMiddelware
}


