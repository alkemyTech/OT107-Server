const express = require('express');

const router = express.Router();
const activitiesRouter = require('./activities');
const registerRouter = require('./auth');

router.use('/activities', activitiesRouter);
router.use('/auth', registerRouter);

module.exports = router;
