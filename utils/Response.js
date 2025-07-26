export const success = (res, message = "Success", data) => {
    return res.status(200).json({ status: "success", message, data });
}

export const error = (res, message = "Error", status = 500) => {
    return res.status(status).json({ status, message });
}