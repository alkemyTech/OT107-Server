const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const isAdmin = require('../middleware/auth');

router.get('/', isAdmin ,contactsController.getAll);

module.exports = router;