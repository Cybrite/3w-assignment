import express from "express";
import upload from "../utils/multer.js";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

// POST /api/upload/image - Upload single image
router.post("/image", upload.single("image"), uploadImage);

export default router;
