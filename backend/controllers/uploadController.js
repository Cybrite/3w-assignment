import { uploadImageToCloudinary } from "../utils/cloudinary.js";

/**
 * Upload image to Cloudinary
 * @route POST /api/upload/image
 * @access Private (authenticated user)
 */
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided." });
    }

    // Upload to Cloudinary
    const { url, publicId } = await uploadImageToCloudinary(
      req.file.buffer,
      req.file.originalname,
    );

    return res.status(200).json({
      message: "Image uploaded successfully.",
      imageUrl: url,
      publicId: publicId,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return res.status(500).json({
      message: error.message || "Unable to upload image.",
    });
  }
};

export { uploadImage };
