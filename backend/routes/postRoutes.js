import express from "express";
import {
  getPosts,
  createPost,
  toggleLike,
  addComment,
  deletePost,
  deleteComment,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.post("/:id/like", toggleLike);
router.post("/:id/comment", addComment);
router.delete("/:id/comment/:commentId", deleteComment);

export default router;
