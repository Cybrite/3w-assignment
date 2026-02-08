export const CommentSection = ({
  comments = [],
  commentDraft,
  onCommentChange,
  onCommentSubmit,
}) => {
  return (
    <>
      <div className="comment-list">
        {comments.slice(-3).map((comment) => (
          <div key={comment._id || comment.createdAt} className="comment">
            <span>{comment.username}</span>
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
