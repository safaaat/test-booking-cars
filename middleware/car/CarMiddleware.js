import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { createClient } from '@supabase/supabase-js';
import { error, success } from "../../utils/Response.js";
import Car from "../../models/CarModel.js";
import dotenv from "dotenv";
import { getCarById } from "../../services/CarService.js";
dotenv.config();

const supabase = createClient(
    process.env.PROJECT_URL,
    process.env.ANON_KEY
);

// Atur Penyimpanan File
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
            cb(new Error("File harus berupa gambar (.jpg, .png, .webp)"));
        } else {
            cb(null, true);
        }
    }
}).fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
]);

export const carUpload = upload;

// Check format image and size
export const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return error(res, "Ukuran file maksimal 1mb", 400);
        }
        return error(res, err.message, 400);
    } else if (err) {
        return error(res, err.message, 400);
    }

    next();
}

// Cek nama mobil dan apakah gambar
export const checkImageAndName = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) return error(res, "Name car harus di isi", 400);
        if (!req.files["image1"]) return error(res, "Image tidak boleh kosong", 400);

        const existingCar = await Car.findOne({ where: { name } });
        if (existingCar) return error(res, "Nama mobil sudah digunakan", 400);

        next();
    } catch (error) {
        return error(res, err.message, 500);
    }
}

export const editCarsImage = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const newImage = req.files["image1"];

    try {
        const carsOld = await getCarById(id);

        if (!carsOld) return error(res, "mobil tidak tersedia", 400);
        if (carsOld.name === name && !newImage) return error(res, "Perubahan ditolak karena data mobil yang dikirim sama dengan sebelumnya", 400);

        next();
    } catch (err) {
        return error(res, err.message, 500);
    }
}

export const processImages = async (req, res, next) => {
    try {
        if (!req.files["image1"]) return next();

        const fields = ["image1", "image2", "image3", "image4", "image5"];
        const image = [];

        for (const field of fields) {
            const file = req.files[field]?.[0];
            if (!file) continue;

            const uuid = crypto.randomUUID();
            const newFilename = `${uuid}.webp`;

            // Upload langsung buffer ke Supabase
            const { error: uploadError } = await supabase.storage
                .from('car-images')
                .upload(newFilename, file.buffer, {
                    contentType: file.mimetype,
                    upsert: true,
                });

            if (uploadError) {
                return error(res, uploadError.message, 500);
            }

            image.push(newFilename);
        }

        req.newImage = image;
        next();
    } catch (err) {
        return error(res, err.message, 500);
    }
}

export const supabaseRemoveImage = async (req, res, next) => {
    const { id } = req.params;

    try {
        if (!req.files["image1"]) return next();

        const cars = await getCarById(id);
        if (!cars) return error(res, "mobil tidak tersedia", 400);
        // Pastikan cars.image dalam bentuk array (bisa dari JSON string)
        const arrayImage = typeof cars.image === "string" ? JSON.parse(cars.image) : cars.image;

        const { data, error: removeErr } = await supabase.storage
            .from("car-images")
            .remove([arrayImage[0]]);

        if (data.length === 0) return error(res, "supabase tidak memiliki image", 400);

        next()
    } catch (err) {
        return error(res, err.message, 500);
    }
}