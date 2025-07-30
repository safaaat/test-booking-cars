import * as CarServis from "../services/CarService.js";
import { error, success } from "../utils/Response.js";

export const getAllCar = async (req, res) => {
    try {
        const data = await CarServis.getAllCar();
        return success(res, "success", data);
    } catch (error) {
        return error(res, err.message, 500);
    }
}

export const postImageCar = async (req, res) => {
    const { name } = req.body;
    const image = JSON.stringify(req.newImage);

    try {
        await CarServis.createCar({
            name,
            image
        });
        return success(res, "Mobil berhasil ditambahkan");
    } catch (err) {
        return error(res, err.message, 500);
    }
}

export const removeImage = async (req, res) => {
    const { id } = req.params

    try {
        await CarServis.removeCar(id);
        return success(res, "Mobil berhasil di hapus");
    } catch (err) {
        return error(res, err.message, 500);
    }
}