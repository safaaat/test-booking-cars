import UsersModel from "../models/UsersModel.js";
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