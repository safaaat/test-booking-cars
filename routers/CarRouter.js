import express from "express";
import { getAllCar, postImageCar } from "../controllers/CarContainer.js";
import { carUpload, checkImageAndName, handleUploadError, processImages } from "../middleware/car/CarMiddleware.js";

const router = express.Router();

router.get("/", getAllCar);
router.post("/upload", carUpload, handleUploadError, checkImageAndName, processImages, postImageCar);

export default router