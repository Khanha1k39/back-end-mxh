const express = require("express");
const authController = require("../controllers/Auth");
const router = express.Router();
const { query } = require("express-validator");

router.post("/login", authController.postLogin);
router.post(
  "/signup",
  query("email").isEmail().withMessage("Email is not valid"),
  authController.postSignUp
);
router.post("/resetpassword", authController.postResetPassWord);
router.post("/reset/:token", authController.postChangePassWord);
router.post("/logout", authController.postLogout);
module.exports = router;
