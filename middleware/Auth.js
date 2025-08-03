import { error } from "../utils/Response";
import { verifyToken } from "../services/JwtService.js";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return error(res, "Unauthorized", 401);

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return error(res, err.message, 500);
    }
}