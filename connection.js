//? To establish connection setting to sql, to be used in other files
const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"cuy_dea"
})

module.exports = db