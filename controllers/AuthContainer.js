import { Op } from "sequelize";
import { generateToken, verifyToken } from "../services/JwtService.js";
import { error, success } from "../utils/Response.js";
import UsersModel from "../models/UsersModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const users = await UsersModel.findOne({
            where: {
                [Op.or]: [
                    name ? { name } : null,
                    email ? { email } : null
                ].filter(Boolean) // buang null dari array
            }
        });

        if (!users) return error(res, "name or email tidak terdaftar");

        const isValid = await bcrypt.compare(password, users.password);
        if (!isValid) return error(res, "Password salah");
        const jwtToken = generateToken(users.dataValues);

        // ⬇️ Kirim sebagai HTTP-only cookie
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE,
            sameSite: process.env.SAMESITE,
            maxAge: 24 * 60 * 60 * 1000,
        });

        return success(res, "login success", { id: users.id, status: users.status });
    } catch (err) {
        return error(res, err.message, 500);
    }
}

export const getMe = async (req, res) => {
    const token = req.cookies.token;

    try {
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = verifyToken(token);

        return success(res, "login success", {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            number_phone: decoded.number_phone,
            status: decoded.status
        });
    } catch (err) {
        return error(res, err.message, 500);
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE,
            sameSite: process.env.SAMESITE,
            path: "/",
            expires: new Date(0),
        });

        return success(res, "Logout berhasil");
    } catch (err) {
        return error(res, err.message, 500);
    }
}