const express = require('express');
const slidesControllers = require('../controllers/slides');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware.isAdmin, slidesControllers.getAll);
router.delete('/:id', authMiddleware.isAdmin, slidesControllers.remove);
router.get('/:id', authMiddleware.isAdmin, slidesControllers.getById);
router.put('/:id', authMiddleware.isAdmin, slidesControllers.update);

module.exports = router;
