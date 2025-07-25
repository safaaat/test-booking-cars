import expres from "express";
import dotenv from "dotenv";

dotenv.config();
const app = expres();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Run Server ${PORT}`);
});