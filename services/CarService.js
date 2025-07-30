import Car from "../models/CarModel.js";

export const getAllCar = async () => {
    return await Car.findAll();
}

export const getCarById = async (id) => {
    return await Car.findByPk(id)
}

export const createCar = async (data) => {
    return await Car.create(data);
}

export const updateCar = async (id, data) => {
    const cars = await Car.findByPk(id);
    if (!cars) return null
    await cars.update(data);
    return cars
}

export const removeCar = async (id) => {
    const cars = await Car.findByPk(id);
    if (!cars) return null
    await cars.destroy();
    return cars
}