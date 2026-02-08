import { useEffect, useState } from "react";
import "./App.css";
import { Topbar } from "./components/Topbar";
import { ErrorBanner } from "./components/ErrorBanner";
import { AuthSection } from "./components/sections/AuthSection";
import { PostComposerSection } from "./components/sections/PostComposerSection";
import { PostFeedSection } from "./components/sections/PostFeedSection";
import { useAuth, usePosts, useImageUpload } from "./hooks";
import {
  loginUser,
  signupUser,
  createPost,
  likePost,
  commentOnPost,
} from "./utils/api";
import { EMPTY_AUTH, EMPTY_POST, AUTH_MODES } from "./constants";

function App() {
  const { user, persistUser, status, setStatus } = useAuth();
  const {
    posts,
    fetchPosts,
    addPost,
    likePostAction,
    addComment,
    deletePostAction,
    deleteCommentAction,
  } = usePosts();
  const {
    imageFile,
    imagePreview,
    isUploading: isUploadingImage,
    error: imageError,
    handleImageSelect,
    handleUpload: uploadImageFile,
    clearImage,
    setError: setImageError,
  } = useImageUpload();

  const [authMode, setAuthMode] = useState(AUTH_MODES.LOGIN);
  const [authForm, setAuthForm] = useState(EMPTY_AUTH);
  const [postForm, setPostForm] = useState(EMPTY_POST);
  const [commentDrafts, setCommentDrafts] = useState({});
  const [showMobileAuth, setShowMobileAuth] = useState(false);

  // Combine all errors into single status
  const allErrors = status.error || imageError;

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setStatus((prev) => ({ ...prev, loading: true, error: "" }));

    try {
      const endpoint = authMode === AUTH_MODES.LOGIN ? loginUser : signupUser;

      let data;
      if (authMode === AUTH_MODES.LOGIN) {
        data = await endpoint(authForm.email, authForm.password);
      } else {
        data = await endpoint(
          authForm.username,
          authForm.email,
          authForm.password,
        );
      }

      persistUser(data.user);
      setAuthForm(EMPTY_AUTH);
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: error.message }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();

    if (!user) {
      setStatus((prev) => ({ ...prev, error: "Please login first." }));
      return;
    }

    setStatus((prev) => ({ ...prev, loading: true, error: "" }));

    try {
      await addPost(user.id, postForm.text, postForm.imageUrl);
      setPostForm(EMPTY_POST);
      clearImage();
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: error.message }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleUploadImage = async () => {
    try {
      const imageUrl = await uploadImageFile();
      if (imageUrl) {
        setPostForm((prev) => ({
          ...prev,
          imageUrl,
        }));
        clearImage();
      }
    } catch (error) {
      setImageError(error.message);
    }
  };

  const handleLike = async (postId) => {
    if (!user) {
      setStatus((prev) => ({ ...prev, error: "Login to like posts." }));
      return;
    }
    try {
      await likePostAction(postId, user.id);
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
      await addComment(postId, user.id, text);
      setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: error.message }));
    }
  };

  const handleDeletePost = async (postId) => {
    if (!user) {
      setStatus((prev) => ({ ...prev, error: "Login required." }));
      return;
    }

    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await deletePostAction(postId, user.id);
      setStatus((prev) => ({
        ...prev,
        error: "",
      }));
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: error.message }));
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    if (!user) {
      setStatus((prev) => ({ ...prev, error: "Login required." }));
      return;
    }

    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      await deleteCommentAction(postId, commentId, user.id);
      setStatus((prev) => ({
        ...prev,
        error: "",
      }));
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: error.message }));
    }
  };

  return (
    <div className="app">
      <Topbar user={user} onLogout={() => persistUser(null)} />

      {/* Mobile Auth Button - Only show when not logged in */}
      {!user && (
        <button
          className="mobile-auth-btn"
          onClick={() => setShowMobileAuth(true)}
        >
          🔐 Login / Signup
        </button>
      )}

      {/* Mobile Auth Overlay */}
      {showMobileAuth && (
        <div
          className="mobile-auth-overlay"
          onClick={() => setShowMobileAuth(false)}
        >
          <div
            className="mobile-auth-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="mobile-auth-close"
              onClick={() => setShowMobileAuth(false)}
            >
              ×
            </button>
            <AuthSection
              authMode={authMode}
              authForm={authForm}
              status={status}
              onAuthModeChange={() =>
                setAuthMode((prev) =>
                  prev === AUTH_MODES.LOGIN
                    ? AUTH_MODES.SIGNUP
                    : AUTH_MODES.LOGIN,
                )
              }
              onFormChange={setAuthForm}
              onAuthSubmit={(e) => {
                handleAuthSubmit(e);
                // Close modal on successful login
                setTimeout(() => setShowMobileAuth(false), 500);
              }}
            />
          </div>
        </div>
      )}

      <main className="shell">
        <section className="column">
          <div className="desktop-auth">
            <AuthSection
              authMode={authMode}
              authForm={authForm}
              status={status}
              onAuthModeChange={() =>
                setAuthMode((prev) =>
                  prev === AUTH_MODES.LOGIN
                    ? AUTH_MODES.SIGNUP
                    : AUTH_MODES.LOGIN,
                )
              }
              onFormChange={setAuthForm}
              onAuthSubmit={handleAuthSubmit}
            />
          </div>

          <PostComposerSection
            postForm={postForm}
            imagePreview={imagePreview}
            imageFile={imageFile}
            isUploadingImage={isUploadingImage}
            onPostFormChange={setPostForm}
            onImageSelect={handleImageSelect}
            onUploadImage={handleUploadImage}
            onRemoveImage={clearImage}
            onCreatePost={handleCreatePost}
            loading={status.loading}
          />

          <ErrorBanner message={allErrors} />
        </section>

        <PostFeedSection
          posts={posts}
          loading={status.loading}
          user={user}
          commentDrafts={commentDrafts}
          onRefresh={fetchPosts}
          onLike={handleLike}
          onCommentChange={(postId, text) =>
            setCommentDrafts((prev) => ({ ...prev, [postId]: text }))
          }
          onCommentSubmit={handleCommentSubmit}
          onPostDelete={handleDeletePost}
          onCommentDelete={handleDeleteComment}
        />
      </main>
    </div>
  );
}

export default App;
