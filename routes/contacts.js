const express = require('express');

const router = express.Router();

const contactsController = require('../controllers/contacts');
const contactsMiddleware = require('../middlewares/contacts');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware.isAuth, contactsMiddleware.contactsInputValidation, contactsController.create);

module.exports = router;
