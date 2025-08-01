import { Op } from "sequelize";
import UsersModel from "../models/UsersModel.js";
import { getAllUsersNoAdmin, postUsers, tokenJwt } from "../services/UsersService.js";
import { error, success } from "../utils/Response.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
    try {
        const user = await getAllUsersNoAdmin();

        return success(res, "berhasil memanggil semua users", user);
    } catch (err) {
        return error(res, err.message, 500);
    }
}

export const register = async (req, res) => {
    const { name, email, number_phone, password } = req.body;

    try {
        // Check email
        const emailUsers = await UsersModel.findOne(
            {
                where: {
                    email
                }
            }
        )
        if (emailUsers) return error(res, "email yang anda gunakan sudah terdaftar", 400);
        // Check nama
        const nameUsers = await UsersModel.findOne({
            where: {
                name
            }
        });
        if (nameUsers) return error(res, "nama yang anda gunakan sudah terdaftar", 400);
        // Check input tidak boleh kosong
        if (!name || !email || !number_phone || !password) return error(res, "name,email,number phone, and password tidak boleh ada yang kosong");

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        await postUsers({ name, email, number_phone, password: hashPassword, status: "users" });

        return success(res, `${name} anda berhasil melakukan registrasi`);
    } catch (err) {
        return error(res, err.message, 500);
    }
}

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

        const jwtToken = await tokenJwt(users);

        // ⬇️ Kirim sebagai HTTP-only cookie
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: true, // pastikan hanya true jika sudah pakai HTTPS
            sameSite: "None", // <<< ini penting agar bisa cross-domain
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

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return success(res, "login success", decoded);
    } catch (err) {
        return error(res, err.message, 500);
    }
}