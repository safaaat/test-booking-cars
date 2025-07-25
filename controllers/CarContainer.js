import * as CarServis from "../services/CarService.js";
import { error, success } from "../utils/Response.js";

export const getAllCar = async (req, res) => {
    try {
        const data = await CarServis.getAllCar();
        return success(res, data);
    } catch (error) {
        next(error)
    }
}