const express = require('express');

const router = express.Router();

const organizationControllers = require('../controllers/organizations');
const authMiddleware = require('../middlewares/auth');
const updateValidations = require('../middlewares/organizations');

router.get('/public', organizationControllers.getOrganizationPublic);
router.put('/public', [authMiddleware.isAdmin, updateValidations.organizationInputValidation], organizationControllers.updateOrganization);

module.exports = router;
