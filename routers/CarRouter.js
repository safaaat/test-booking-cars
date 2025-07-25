import express from "express";
import { getAllCar } from "../controllers/CarContainer.js";

const router = express.Router();

router.get("/", getAllCar);

export default router