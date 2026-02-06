import express from "express";
import {
  getPosts,
  createPost,
  toggleLike,
  addComment,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.post("/:id/like", toggleLike);
router.post("/:id/comment", addComment);

export default router;
