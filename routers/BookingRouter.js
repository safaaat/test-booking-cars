import express from "express";
import { getBooking, postBooking } from "../controllers/BookingContainer.js";

const router = express.Router();

router.get("/", getBooking);
router.post("/post/:id", postBooking);

export default router