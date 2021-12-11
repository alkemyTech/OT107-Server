const express = require('express');

const router = express.Router();
const membersController = require('../controllers/members');
const authMiddleware = require('../middlewares/auth');
const paginateMiddleware = require('../middlewares/pagination');
const validationMiddleware = require('../middlewares/members');

router.get('/', authMiddleware.isAuth, paginateMiddleware.pageValidation, membersController.getAll);
router.post('/', authMiddleware.isAuth, validationMiddleware.membersValidation, membersController.create);
router.delete('/:id', authMiddleware.isAuth, membersController.remove);
router.put('/:id', authMiddleware.isAuth, validationMiddleware.membersValidation, membersController.update);

module.exports = router;
