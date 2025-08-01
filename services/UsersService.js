import UsersModel from "../models/UsersModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const getAllUsers = async () => {
    return await UsersModel.findAll();
}

export const getAllUsersNoAdmin = async () => {
    return await UsersModel.findAll({ where: { status: "users" } });
}

export const postUsers = async (data) => {
    return await UsersModel.create(data);
}

export const removeUsers = async (id) => {
    const users = await UsersModel.findByPk(id);
    if (!users) return null
    return await users.destroy();
}

export const tokenJwt = async (users) => {
    const token = jwt.sign(
        {
            id: users.id,
            name: users.name,
            email: users.email,
            number_phone: users.number_phone,
            password: users.password,
            status: users.status
        },
        process.env.JWT_SECRET || "rahasia",
        { expiresIn: "1d" }
    )

    return token
}