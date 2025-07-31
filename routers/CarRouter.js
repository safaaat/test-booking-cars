import express from "express";
import { editImage, getAllCar, postImageCar, removeImage } from "../controllers/CarContainer.js";
import { carUpload, checkImageAndName, editCarsImage, handleUploadError, processImages, supabaseRemoveImage } from "../middleware/car/CarMiddleware.js";

const router = express.Router();

router.get("/", getAllCar);
router.post("/upload", carUpload, handleUploadError, checkImageAndName, processImages, postImageCar);
router.delete("/remove/:id", supabaseRemoveImage, removeImage);
router.patch("/edit/:id", carUpload, handleUploadError, editCarsImage, supabaseRemoveImage, processImages, editImage);

export default router