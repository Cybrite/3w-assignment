import Post from "../models/Post.js";
import User from "../models/User.js";

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.json({ posts });
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch posts." });
  }
};

const createPost = async (req, res) => {
  try {
    const { userId, text, imageUrl } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "Login required." });
    }
    if (!text?.trim() && !imageUrl?.trim()) {
      return res.status(400).json({ message: "Add text or an image URL." });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const post = await Post.create({
      authorId: user._id,
      authorName: user.username,
      text: text?.trim() || "",
      imageUrl: imageUrl?.trim() || "",
      likes: [],
      comments: [],
    });
    return res.status(201).json({ post });
  } catch (error) {
    return res.status(500).json({ message: "Unable to create post." });
  }
};

const toggleLike = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "Login required." });
    }
    const [user, post] = await Promise.all([
      User.findById(userId),
      Post.findById(req.params.id),
    ]);
    if (!user || !post) {
      return res.status(404).json({ message: "Post or user not found." });
    }
    const alreadyLiked = post.likes.some(
      (like) => like.userId?.toString() === userId,
    );
    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (like) => like.userId?.toString() !== userId,
      );
    } else {
      post.likes.push({ userId: user._id, username: user.username });
    }
    await post.save();
    return res.json({ post });
  } catch (error) {
    return res.status(500).json({ message: "Unable to update like." });
  }
};

const addComment = async (req, res) => {
  try {
    const { userId, text } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "Login required." });
    }
    if (!text?.trim()) {
      return res.status(400).json({ message: "Comment cannot be empty." });
    }
    const [user, post] = await Promise.all([
      User.findById(userId),
      Post.findById(req.params.id),
    ]);
    if (!user || !post) {
      return res.status(404).json({ message: "Post or user not found." });
    }
    post.comments.push({
      userId: user._id,
      username: user.username,
      text: text.trim(),
    });
    await post.save();
    return res.json({ post });
  } catch (error) {
    return res.status(500).json({ message: "Unable to add comment." });
  }
};

const deletePost = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "Login required." });
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    if (post.authorId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own posts." });
    }
    await Post.findByIdAndDelete(req.params.id);
    return res.json({ message: "Post deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Unable to delete post." });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id: postId, commentId } = req.params;
    if (!userId) {
      return res.status(401).json({ message: "Login required." });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }
    if (comment.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comments." });
    }
    post.comments.id(commentId).deleteOne();
    await post.save();
    return res.json({ post });
  } catch (error) {
    return res.status(500).json({ message: "Unable to delete comment." });
  }
};

export {
  getPosts,
  createPost,
  toggleLike,
  addComment,
  deletePost,
  deleteComment,
};
