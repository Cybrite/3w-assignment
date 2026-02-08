export const validateImageFile = (file) => {
  if (!file.type.startsWith("image/")) {
    return { valid: false, error: "Please select a valid image file." };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { valid: false, error: "Image size must be less than 5MB." };
  }

  return { valid: true };
};

export const validatePostContent = (text, imageUrl) => {
  return text.trim() || imageUrl.trim();
};

export const validateComment = (text) => {
  return text.trim().length > 0;
};
