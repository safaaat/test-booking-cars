// import mysql from "mysql2";
// import dotenv from "dotenv";

// dotenv.config();
// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DBNAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// pool.getConnection((err, conn) => {
//     if (err) console.log(err)
//     console.log("Connected Database successfully")
// })

// export default pool.promise();

import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import "mysql2";
dotenv.config();

export const db = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false
    }
)

//  Cek koneksi database & Sync
db.authenticate()
    .then(() => {
        console.log("Connected to MySQL database via Sequelize");

        // Sinkronisasi tabel (otomatis create jika belum ada)
        return db.sync(); // ← ini bagian pentingnya
    })
    .then(() => {
        console.log("All models were synchronized successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect or sync:", err);
    });