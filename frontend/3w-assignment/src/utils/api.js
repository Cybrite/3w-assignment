import env from "../config/env";

export const apiCall = async (endpoint, options = {}) => {
  const url = `${env.API_BASE}${endpoint}`;
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
};

export const getPosts = () => apiCall("/api/posts");

export const loginUser = (email, password) =>
  apiCall("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

export const signupUser = (username, email, password) =>
  apiCall("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

export const createPost = (userId, text, imageUrl) =>
  apiCall("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, text, imageUrl }),
  });

export const likePost = (postId, userId) =>
  apiCall(`/api/posts/${postId}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

export const commentOnPost = (postId, userId, text) =>
  apiCall(`/api/posts/${postId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, text }),
  });

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return apiCall("/api/upload/image", {
    method: "POST",
    body: formData,
  });
};
