const express = require("express");

const router = express.Router();

const authController = require("../controllers/users");

const authMiddleware = require("../middlewares/auth");

router.post(
  "/register",
  authMiddleware.registerInputValidation,
  authController.create
);
router.post(
  "/login",
  authMiddleware.loginInputValidation,
  authController.login
);
router.get("/me", authMiddleware.isAuth, authController.getById);

module.exports = router;
