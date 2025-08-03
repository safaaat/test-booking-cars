import UsersModel from "../models/UsersModel.js";
import { getAllUsersNoAdmin, postUsers } from "../services/UsersService.js";
import { error, success } from "../utils/Response.js";
import bcrypt from "bcrypt";

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