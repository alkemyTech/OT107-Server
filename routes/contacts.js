const express = require('express');

const router = express.Router();

const contactsController = require('../controllers/contacts');
const contactsMiddleware = require('../middlewares/contacts');
const authMiddleware = require('../middlewares/auth');

router.post('/', contactsMiddleware.contactsInputValidation, authMiddleware.isAuth,contactsController.create);

module.exports = router;
