import { createBooking, getBookingAll } from "../services/BookingService.js";
import { getCarById } from "../services/CarService.js";
import { error, success } from "../utils/Response.js";

export const getBooking = async (req, res) => {
    try {
        const booking = await getBookingAll();
        return success(res, "success get booking", booking);
    } catch (err) {
        return error(res, err.message, 500);
    }
}

export const postBooking = async (req, res) => {
    const { id } = req.params;
    const { name_user, email, phone_number, start_time, end_time } = req.body;

    try {
        const cars = await getCarById(id);
        // Check apakah ada Car
        if (!cars) return error(res, "Booking mobil ditolak karena mobil yang anda booking tidak dapat di temukan.");
        // Check apakah name,email,dan number phone tidak boleh kosong
        if (!name_user || !email || !phone_number) return error(res, "input name, email, dan number phone tidak boleh kosong");
        // Check waktu booking tidak boleh kosong
        if (!start_time || !end_time) return error(res, "waktu mulai dan selesai booking mobil harus di isi");

        await createBooking({
            name_user,
            email,
            phone_number,
            id_car: id,
            name_car: cars.name,
            image_car: cars.image,
            is_confirmed: false,
            start_time,
            end_time
        })

        return success(res, "Anda berhasil melakukan booking car");
    } catch (err) {
        return error(res, err.message, 500);
    }
}