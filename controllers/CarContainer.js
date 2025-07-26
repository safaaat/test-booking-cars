import * as CarServis from "../services/CarService.js";
import { error, success } from "../utils/Response.js";

export const getAllCar = async (req, res) => {
    try {
        const data = await CarServis.getAllCar();
        return success(res, data);
    } catch (error) {
        return error(res, err.message, 500);
    }
}

export const postImageCar = async (req, res) => {
    const { name } = req.body;
    const image = JSON.stringify(req.newImage);
    const url = JSON.stringify(req.newUrlImage);

    try {
        await CarServis.createCar({
            name,
            image,
            url,
        });
        return success(res, "Mobil berhasil ditambahkan");
    } catch (err) {
        return error(res, err.message, 500);
    }
}