const express = require('express');

const router = express.Router();
const activitiesRouter = require('./activities');
const registerRouter = require('./register');

router.use('/activities', activitiesRouter);
router.use('/auth/register', registerRouter);

module.exports = router;
