const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
/* GET users listing. */
router.get('/', usersController.getAll);

module.exports = router;
