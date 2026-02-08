import { ImageUploadSection } from "../ImageUploadSection";
import { validatePostContent } from "../../utils/validation";

export const PostComposerSection = ({
  postForm,
  imagePreview,
  imageFile,
  isUploadingImage,
  onPostFormChange,
  onImageSelect,
  onUploadImage,
  onRemoveImage,
  onCreatePost,
  loading,
}) => {
  const canSubmitPost = validatePostContent(postForm.text, postForm.imageUrl);

  return (
    <div className="card composer">
      <div className="card-header">
        <h2>Share an update</h2>
        <p>Post a thought, a photo link, or both.</p>
      </div>
      <form onSubmit={onCreatePost} className="form">
        <label className="field">
          <span>Message</span>
          <textarea
            rows="4"
            value={postForm.text}
            onChange={(e) =>
              onPostFormChange({ ...postForm, text: e.target.value })
            }
            placeholder="What are you working on today?"
          />
        </label>

        <ImageUploadSection
          imagePreview={imagePreview}
          imageUrl={postForm.imageUrl}
          onImageSelect={onImageSelect}
          onUpload={onUploadImage}
          onRemove={onRemoveImage}
          isUploading={isUploadingImage}
        />

        <button
          className="primary"
          type="submit"
          disabled={!canSubmitPost || isUploadingImage || loading}
        >
          {isUploadingImage ? "Uploading..." : "Post to feed"}
        </button>
      </form>
    </div>
  );
};
