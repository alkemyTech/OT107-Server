const express = require('express');

const router = express.Router();
const membersController = require('../controllers/members');
const authMiddleware = require('../middlewares/auth');
const validationMiddleware = require('../middlewares/members');

router.get('/', authMiddleware.isAdmin, membersController.getAll);

router.post('/', authMiddleware.isAuth, validationMiddleware.membersValidation, membersController.create);

router.put('/:id', authMiddleware.isAuth, validationMiddleware.membersValidation, validationMiddleware.memberExist, membersController.update);

router.delete('/:id', authMiddleware.isAuth, membersController.remove);

module.exports = router;
