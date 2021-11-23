const express = require("express");
const router = express.Router();

const contactsController = require('../controllers/contacts');
const admin = require('../middleware/admin');

router.get('/', admin, contactsController.getAll);

module.exports = router;