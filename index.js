import expres from "express";
import dotenv from "dotenv";
import pool from "./database/index.js";

dotenv.config();
const app = expres();

const PORT = process.env.PORT || 5000;

// Test koneksi database
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL database");
        connection.release(); // penting: lepas koneksi setelah dipakai
    }
})

app.listen(PORT, () => {
    console.log(`Run Server ${PORT}`);
});