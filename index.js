import express from "express";
import dotenv from "dotenv";
import "./database/index.js";
import carRouter from "./routers/CarRouter.js";

dotenv.config();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/car", carRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Run Server ${PORT}`);
});