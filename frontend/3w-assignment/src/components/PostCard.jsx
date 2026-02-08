import { CommentSection } from "./CommentSection";

export const PostCard = ({
  post,
  userLiked,
  commentDraft,
  onLike,
  onCommentChange,
  onCommentSubmit,
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
        onCommentChange={onCommentChange}
        onCommentSubmit={onCommentSubmit}
      />
    </article>
  );
};
