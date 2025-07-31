import BookingModel from "../models/BookingModel.js"

export const getBookingAll = async () => {
    return await BookingModel.findAll();
}

export const getBookingById = async (id) => {
    const booking = await BookingModel.findByPk(id);
    if (!booking) return null
    return booking
}

export const createBooking = async (data) => {
    return await BookingModel.create(data);
}

export const deleteBooking = async (id) => {
    const booking = await BookingModel.findByPk(id);
    if (!booking) return null;
    await booking.destroy();
    return booking
}

export const updateBooking = async (id, data) => {
    const booking = await BookingModel.findByPk(id);
    if (!booking) return null;
    await booking.update(data);
    return booking
}
