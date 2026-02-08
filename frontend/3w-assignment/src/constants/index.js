export const EMPTY_AUTH = {
  username: "",
  email: "",
  password: "",
};

export const EMPTY_POST = {
  text: "",
  imageUrl: "",
};

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const AUTH_MODES = {
  LOGIN: "login",
  SIGNUP: "signup",
};

export const LOCAL_STORAGE_KEYS = {
  USER: "tp_user",
};

export const API_ENDPOINTS = {
  POSTS: "/api/posts",
  AUTH_LOGIN: "/api/auth/login",
  AUTH_SIGNUP: "/api/auth/signup",
  POST_LIKE: (postId) => `/api/posts/${postId}/like`,
  POST_COMMENT: (postId) => `/api/posts/${postId}/comment`,
  UPLOAD_IMAGE: "/api/upload/image",
};
