const express = require("express");
const router = express.Router();
const membersController = require("../controllers/members")


router.get("/", authMiddleware.isAdmin, membersController.getAll)

module.exports = router