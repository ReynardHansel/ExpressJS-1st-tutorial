// Function for Formatting result (custom response)
//* express deprecated res.json(status, obj): Use res.status(status).json(obj) instead
const response = (statusCode, data, message, res) => {
    res.status(statusCode).json(
        [
        {
            payload: data,
            message,
            status_code: statusCode,
            metadata_or_pagination: {
                prev: "",
                next: "",
                current: ""
            }
        }
        ]
    )
}


module.exports = response