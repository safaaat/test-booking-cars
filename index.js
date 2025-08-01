import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./database/index.js";
import carRouter from "./routers/CarRouter.js";
import bookingRouter from "./routers/BookingRouter.js";
import users from "./routers/UsersRouter.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Jika kamu mau lebih spesifik:
app.use(cors({
    origin: process.env.URL_FRON_END, // frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use("/car", carRouter);
app.use("/booking", bookingRouter);
app.use("/users", users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Run Server ${PORT}`);
});