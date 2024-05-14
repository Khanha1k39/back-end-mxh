const express = require("express");
const searchController = require("../controllers/Search");
const router = express.Router();

router.get("/search", searchController.searchUser);
module.exports = router;
