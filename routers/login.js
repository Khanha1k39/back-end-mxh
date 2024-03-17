const express = require("express");
const loginController = require("../controllers/loginController");
const router = express.Router();

router.get("/login", loginController.getLogin);
router.post("/login", loginController.postLogin);
module.exports = router;
