import { useState, useCallback } from "react";
import { getPosts, createPost, likePost, commentOnPost } from "../utils/api";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getPosts();
      setPosts(data.posts || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addPost = useCallback(async (userId, text, imageUrl) => {
    try {
      const data = await createPost(userId, text, imageUrl);
      setPosts((prev) => [data.post, ...prev]);
      return data.post;
    } catch (err) {
      throw err;
    }
  }, []);

  const likePostAction = useCallback(async (postId, userId) => {
    try {
      const data = await likePost(postId, userId);
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? data.post : post)),
      );
      return data.post;
    } catch (err) {
      throw err;
    }
  }, []);

  const addComment = useCallback(async (postId, userId, text) => {
    try {
      const data = await commentOnPost(postId, userId, text);
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? data.post : post)),
      );
      return data.post;
    } catch (err) {
      throw err;
    }
  }, []);

  return {
    posts,
    setPosts,
    loading,
    error,
    fetchPosts,
    addPost,
    likePostAction,
    addComment,
  };
};
