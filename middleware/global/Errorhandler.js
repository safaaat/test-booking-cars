import { error } from "../../utils/Response.js";

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    return error(res, err.message || "Internal Server Error")
}