import { useState, useCallback } from "react";
import { uploadImage } from "../utils/api";
import { validateImageFile } from "../utils/validation";

export const useImageUpload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageSelect = useCallback((file) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error);
      return false;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result);
    };
    reader.readAsDataURL(file);
    setError("");
    return true;
  }, []);

  const handleUpload = useCallback(async () => {
    if (!imageFile) {
      setError("No image selected.");
      return null;
    }

    setIsUploading(true);
    setError("");

    try {
      const data = await uploadImage(imageFile);
      return data.imageUrl;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [imageFile]);

  const clearImage = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setError("");
  }, []);

  return {
    imageFile,
    imagePreview,
    isUploading,
    error,
    handleImageSelect,
    handleUpload,
    clearImage,
    setError,
  };
};
