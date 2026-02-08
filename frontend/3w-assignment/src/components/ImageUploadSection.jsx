export const ImageUploadSection = ({
  imagePreview,
  imageUrl,
  onImageSelect,
  onUpload,
  onRemove,
  isUploading,
}) => {
  return (
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
                onClick={onUpload}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Image"}
              </button>
              <button
                type="button"
                className="ghost"
                onClick={onRemove}
                disabled={isUploading}
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
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onImageSelect(file);
              }}
              style={{ display: "none" }}
            />
            <span className="file-input-button">
              {imageUrl ? "Change Image" : "Select Image"}
            </span>
          </label>
        )}

        {imageUrl && !imagePreview && (
          <div className="uploaded-image-info">
            <p className="success-message">✓ Image uploaded</p>
            <button type="button" className="ghost-small" onClick={onRemove}>
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
