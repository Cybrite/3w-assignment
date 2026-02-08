import { CommentSection } from "./CommentSection";

export const PostCard = ({
  post,
  user,
  userLiked,
  commentDraft,
  onLike,
  onCommentChange,
  onCommentSubmit,
  onPostDelete,
  onCommentDelete,
}) => {
  return (
    <article className="card post" key={post._id}>
      <header className="post-header">
        <div>
          <p className="post-author">{post.authorName}</p>
          <p className="post-meta">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="post-header-actions">
          <span className="badge">Public</span>
          {user && post.authorId === user.id && (
            <button
              type="button"
              className="delete-post-btn"
              onClick={() => onPostDelete(post._id)}
              title="Delete post"
            >
              ×
            </button>
          )}
        </div>
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
          className={userLiked ? "like active" : "like"}
          onClick={() => onLike(post._id)}
        >
          {userLiked ? "Liked" : "Like"}
          <span>{post.likes?.length || 0}</span>
        </button>
        <span className="meta-chip">Comments {post.comments?.length || 0}</span>
      </div>
      <CommentSection
        comments={post.comments}
        commentDraft={commentDraft}
        user={user}
        onCommentChange={onCommentChange}
        onCommentSubmit={onCommentSubmit}
        onCommentDelete={onCommentDelete}
      />
    </article>
  );
};
