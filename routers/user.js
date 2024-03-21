const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.get("/users", userController.getUsers);
router.post("/users", userController.postUsers);
module.exports = router;
