const express = require("express");
const {
  getPosts,
  createPost,
  toggleLike,
  addComment,
} = require("../controllers/postController");

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.post("/:id/like", toggleLike);
router.post("/:id/comment", addComment);

module.exports = router;
