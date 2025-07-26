import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import crypto from "crypto";

import { error } from "../../utils/Response.js";
import Car from "../../models/CarModel.js";

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
    console.log()
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

export const processImages = async (req, res, next) => {
    try {
        const fields = ["image1", "image2", "image3", "image4", "image5"];
        const image = [];
        const urlImage = [];

        for (const field of fields) {
            const file = req.files[field]?.[0];
            if (!file) continue;

            const uuid = crypto.randomUUID();
            const newFilename = `${uuid}.webp`;
            const outputPath = path.resolve(`public/images/car/${newFilename}`);

            await sharp(file.buffer)
                .resize(800)
                .webp({ quality: 80 })
                .toFile(outputPath)

            image.push(newFilename);
            urlImage.push(`images/car/${newFilename}`);
        }

        req.newUrlImage = urlImage;
        req.newImage = image;
        next();
    } catch (err) {
        return error(res, err.message, 500);
    }
}