const express = require("express");
const Message = require("../models/Message");
const router = express.Router();
const messageController = require("../controllers/Message");

const protectRoute = require("../middlewares/ProtectRoute");
router.post("/send/:userId", messageController.sendMessage);
router.get("/:userId", messageController.getMessages);
module.exports = router;
