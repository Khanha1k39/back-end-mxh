const express = require("express");
const postController = require("../controllers/post");
const router = express.Router();

router.get("/posts", postController.getPosts);
router.post("/posts", postController.postPost);
router.get("/post/:productId", postController.getProduct);
router.post("/post/:productId/edit", postController.updatePost);
router.delete("/post/:productId", postController.deletePost);
module.exports = router;
