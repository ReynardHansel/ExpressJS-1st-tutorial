// Function for Formatting result (custom response)
const response_awal = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        payload: {
            status_code: statusCode,
            message: message,
            datas: data
        },
        metadata_or_pagination: {
            prev: "",
            next: "",
            current: ""
        }
    })
}

module.exports = response_awal