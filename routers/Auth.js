const express = require("express");
const authController = require("../controllers/Auth");
const router = express.Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/signup", authController.postSignUp);
router.post("/resetpassword", authController.postResetPassWord);

module.exports = router;
