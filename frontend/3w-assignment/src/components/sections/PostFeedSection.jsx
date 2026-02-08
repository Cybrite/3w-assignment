import { PostCard } from "../PostCard";

export const PostFeedSection = ({
  posts,
  loading,
  user,
  commentDrafts,
  onRefresh,
  onLike,
  onCommentChange,
  onCommentSubmit,
  onPostDelete,
  onCommentDelete,
}) => {
  return (
    <section className="column feed">
      <div className="feed-header">
        <h2>Public feed</h2>
        <button className="ghost" type="button" onClick={onRefresh}>
          Refresh
        </button>
      </div>

      {loading && <p className="muted">Loading updates...</p>}

      {posts.length === 0 && !loading ? (
        <div className="card empty">
          <h3>No posts yet</h3>
          <p>Be the first to share an update with the community.</p>
        </div>
      ) : (
        posts.map((post) => {
          const userLiked = post.likes?.some(
            (like) => like.userId === user?.id,
          );
          return (
            <PostCard
              key={post._id}
              post={post}
              user={user}
              userLiked={userLiked}
              commentDraft={commentDrafts[post._id] || ""}
              onLike={onLike}
              onCommentChange={(text) => onCommentChange(post._id, text)}
              onCommentSubmit={() => onCommentSubmit(post._id)}
              onPostDelete={onPostDelete}
              onCommentDelete={(commentId) =>
                onCommentDelete(post._id, commentId)
              }
            />
          );
        })
      )}
    </section>
  );
};
