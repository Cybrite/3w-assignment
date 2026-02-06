import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const emptyAuth = {
  username: "",
  email: "",
  password: "",
};

const emptyPost = {
  text: "",
  imageUrl: "",
};

function App() {
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState(emptyAuth);
  const [postForm, setPostForm] = useState(emptyPost);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [commentDrafts, setCommentDrafts] = useState({});
  const [status, setStatus] = useState({ loading: false, error: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const canSubmitPost = useMemo(() => {
    return postForm.text.trim() || postForm.imageUrl.trim();
  }, [postForm]);

  useEffect(() => {
    const savedUser = localStorage.getItem("tp_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("tp_user");
      }
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setStatus((prev) => ({ ...prev, loading: true, error: "" }));
    try {
      const response = await fetch(`${API_BASE}/api/posts`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to load posts");
      }
      setPosts(data.posts || []);
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: error.message }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const persistUser = (nextUser) => {
    setUser(nextUser);
    if (nextUser) {
      localStorage.setItem("tp_user", JSON.stringify(nextUser));
    } else {
      localStorage.removeItem("tp_user");
    }
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setStatus((prev) => ({ ...prev, loading: true, error: "" }));
    const endpoint = authMode === "login" ? "login" : "signup";
    const payload =
      authMode === "login"
        ? { email: authForm.email, password: authForm.password }
        : {
            username: authForm.username,
            email: authForm.email,
            password: authForm.password,
          };

    try {
      const response = await fetch(`${API_BASE}/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }
      persistUser(data.user);
      setAuthForm(emptyAuth);
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: error.message }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setStatus((prev) => ({
          ...prev,
          error: "Please select a valid image file.",
        }));
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setStatus((prev) => ({
          ...prev,
          error: "Image size must be less than 5MB.",
        }));
        return;
      }

      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result);
      };
      reader.readAsDataURL(file);
      setStatus((prev) => ({ ...prev, error: "" }));
    }
  };

  const handleUploadImage = async () => {
    if (!imageFile) {
      setStatus((prev) => ({ ...prev, error: "No image selected." }));
      return;
    }

    setIsUploadingImage(true);
    setStatus((prev) => ({ ...prev, error: "" }));

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(`${API_BASE}/api/upload/image`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload image.");
      }

      // Set the uploaded image URL
      setPostForm((prev) => ({
        ...prev,
        imageUrl: data.imageUrl,
      }));

      // Clear file input and preview
      setImageFile(null);
      setImagePreview(null);

      setStatus((prev) => ({
        ...prev,
        loading: false,
      }));
    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        error: error.message,
      }));
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setPostForm((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();
    if (!user) {
      setStatus((prev) => ({ ...prev, error: "Please login first." }));
      return;
    }
    if (!canSubmitPost) {
      setStatus((prev) => ({ ...prev, error: "Add text or an image URL." }));
      return;
    }
    setStatus((prev) => ({ ...prev, loading: true, error: "" }));
    try {
      const response = await fetch(`${API_BASE}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          text: postForm.text,
          imageUrl: postForm.imageUrl,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to create post");
      }
      setPosts((prev) => [data.post, ...prev]);
      setPostForm(emptyPost);
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: error.message }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleLike = async (postId) => {
    if (!user) {
      setStatus((prev) => ({ ...prev, error: "Login to like posts." }));
      return;
    }
    try {
      const response = await fetch(`${API_BASE}/api/posts/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to update like");
      }
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? data.post : post)),
      );
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: error.message }));
    }
  };

  const handleCommentSubmit = async (postId) => {
    const text = commentDrafts[postId]?.trim();
    if (!user) {
      setStatus((prev) => ({ ...prev, error: "Login to comment." }));
      return;
    }
    if (!text) {
      setStatus((prev) => ({ ...prev, error: "Comment cannot be empty." }));
      return;
    }
    try {
      const response = await fetch(`${API_BASE}/api/posts/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, text }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to add comment");
      }
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? data.post : post)),
      );
      setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: error.message }));
    }
  };

  const handleLogout = () => {
    persistUser(null);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <p className="eyebrow">TaskPlanet Social</p>
          <h1 className="brand">Pulse</h1>
        </div>
        <div className="user-chip">
          {user ? (
            <>
              <div>
                <p className="chip-label">Logged in</p>
                <p className="chip-name">{user.username}</p>
              </div>
              <button type="button" className="ghost" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <p className="chip-muted">Guest</p>
          )}
        </div>
      </header>

      <main className="shell">
        <section className="column">
          <div className="card auth-card">
            <div className="card-header">
              <h2>
                {authMode === "login" ? "Welcome back" : "Create account"}
              </h2>
              <p>
                {authMode === "login"
                  ? "Log in to join the conversation."
                  : "Sign up in seconds to share updates."}
              </p>
            </div>
            <form onSubmit={handleAuthSubmit} className="form">
              {authMode === "signup" && (
                <label className="field">
                  <span>Username</span>
                  <input
                    type="text"
                    value={authForm.username}
                    onChange={(event) =>
                      setAuthForm((prev) => ({
                        ...prev,
                        username: event.target.value,
                      }))
                    }
                    placeholder="TaskTrekker"
                    required
                  />
                </label>
              )}
              <label className="field">
                <span>Email</span>
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(event) =>
                    setAuthForm((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="field">
                <span>Password</span>
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(event) =>
                    setAuthForm((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  required
                />
              </label>
              <button className="primary" type="submit">
                {authMode === "login" ? "Login" : "Sign up"}
              </button>
            </form>
            <button
              type="button"
              className="link"
              onClick={() =>
                setAuthMode((prev) => (prev === "login" ? "signup" : "login"))
              }
            >
              {authMode === "login"
                ? "New here? Create an account."
                : "Already have an account? Login."}
            </button>
          </div>

          <div className="card composer">
            <div className="card-header">
              <h2>Share an update</h2>
              <p>Post a thought, a photo link, or both.</p>
            </div>
            <form onSubmit={handleCreatePost} className="form">
              <label className="field">
                <span>Message</span>
                <textarea
                  rows="4"
                  value={postForm.text}
                  onChange={(event) =>
                    setPostForm((prev) => ({
                      ...prev,
                      text: event.target.value,
                    }))
                  }
                  placeholder="What are you working on today?"
                />
              </label>

              <div className="field">
                <span>Add Image</span>
                <div className="image-upload-section">
                  {imagePreview ? (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                      <div className="preview-actions">
                        <button
                          type="button"
                          className="primary"
                          onClick={handleUploadImage}
                          disabled={isUploadingImage}
                        >
                          {isUploadingImage ? "Uploading..." : "Upload Image"}
                        </button>
                        <button
                          type="button"
                          className="ghost"
                          onClick={handleRemoveImage}
                          disabled={isUploadingImage}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="file-input-wrapper">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        style={{ display: "none" }}
                      />
                      <span className="file-input-button">
                        {postForm.imageUrl ? "Change Image" : "Select Image"}
                      </span>
                    </label>
                  )}

                  {postForm.imageUrl && !imagePreview && (
                    <div className="uploaded-image-info">
                      <p className="success-message">✓ Image uploaded</p>
                      <button
                        type="button"
                        className="ghost-small"
                        onClick={handleRemoveImage}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button
                className="primary"
                type="submit"
                disabled={!canSubmitPost || isUploadingImage}
              >
                {isUploadingImage ? "Uploading..." : "Post to feed"}
              </button>
            </form>
          </div>

          {status.error && <div className="banner">{status.error}</div>}
        </section>

        <section className="column feed">
          <div className="feed-header">
            <h2>Public feed</h2>
            <button className="ghost" type="button" onClick={fetchPosts}>
              Refresh
            </button>
          </div>

          {status.loading && <p className="muted">Loading updates...</p>}

          {posts.length === 0 && !status.loading ? (
            <div className="card empty">
              <h3>No posts yet</h3>
              <p>Be the first to share an update with the community.</p>
            </div>
          ) : (
            posts.map((post) => {
              const likedByUser = post.likes?.some(
                (like) => like.userId === user?.id,
              );
              return (
                <article className="card post" key={post._id}>
                  <header className="post-header">
                    <div>
                      <p className="post-author">{post.authorName}</p>
                      <p className="post-meta">
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="badge">Public</span>
                  </header>
                  {post.text && <p className="post-text">{post.text}</p>}
                  {post.imageUrl && (
                    <div className="post-media">
                      <img src={post.imageUrl} alt="Post" />
                    </div>
                  )}
                  <div className="post-actions">
                    <button
                      type="button"
                      className={likedByUser ? "like active" : "like"}
                      onClick={() => handleLike(post._id)}
                    >
                      {likedByUser ? "Liked" : "Like"}
                      <span>{post.likes?.length || 0}</span>
                    </button>
                    <span className="meta-chip">
                      Comments {post.comments?.length || 0}
                    </span>
                  </div>
                  <div className="comment-list">
                    {(post.comments || []).slice(-3).map((comment) => (
                      <div
                        key={comment._id || comment.createdAt}
                        className="comment"
                      >
                        <span>{comment.username}</span>
                        <p>{comment.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="comment-form">
                    <input
                      type="text"
                      placeholder="Add a comment"
                      value={commentDrafts[post._id] || ""}
                      onChange={(event) =>
                        setCommentDrafts((prev) => ({
                          ...prev,
                          [post._id]: event.target.value,
                        }))
                      }
                    />
                    <button
                      type="button"
                      onClick={() => handleCommentSubmit(post._id)}
                    >
                      Send
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
