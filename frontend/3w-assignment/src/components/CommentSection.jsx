export const CommentSection = ({
  comments = [],
  commentDraft,
  user,
  onCommentChange,
  onCommentSubmit,
  onCommentDelete,
}) => {
  return (
    <>
      <div className="comment-list">
        {comments.slice(-3).map((comment) => (
          <div key={comment._id || comment.createdAt} className="comment">
            <div className="comment-header">
              <span>{comment.username}</span>
              {user && comment.userId === user.id && (
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => onCommentDelete(comment._id)}
                  title="Delete comment"
                >
                  ×
                </button>
              )}
            </div>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <div className="comment-form">
        <input
          type="text"
          placeholder="Add a comment"
          value={commentDraft}
          onChange={(e) => onCommentChange(e.target.value)}
        />
        <button type="button" onClick={onCommentSubmit}>
          Send
        </button>
      </div>
    </>
  );
};
