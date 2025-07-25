export const success = (res, data, message = "Success") => {
    return res.status(200).json({ status: "success", message, data });
}

export const error = (res, message = "Error") => {
    return res.status(500).json({ status: "error", message });
}