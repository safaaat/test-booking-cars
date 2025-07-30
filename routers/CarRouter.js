import express from "express";
import { getAllCar, postImageCar, removeImage } from "../controllers/CarContainer.js";
import { carUpload, checkImageAndName, handleUploadError, processImages, supabaseRemoveImage } from "../middleware/car/CarMiddleware.js";

const router = express.Router();

router.get("/", getAllCar);
router.post("/upload", carUpload, handleUploadError, checkImageAndName, processImages, postImageCar);
router.delete("/remove/:id", supabaseRemoveImage, removeImage);

export default router