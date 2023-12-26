const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response_awal')

app.use(bodyParser.json()) //* --> data yg ditrima dr frontend diubah menjadi json

app.get("/", (req, res) => {
    // res.send(304, "App online") //* --> Wajib ada (ada samting?) kl ga web nya muter" trs loding
    response(200, "result here", "App online", res)
})
//* --> Mau munculin data dari database, bisa pake .get


app.get("/mahasiswa/", (req, res) => {
    response(200, "List mahasiswa", "Get all data from mahasiswa", res)
})


app.get("/mahasiswa/:nim", (req, res) => {
    const nim = req.params.nim
    // res.send(`Get mahasiswa by nim: ${nim}`)
    response(200, nim, `Get mahasiswa by nim: ${nim}`, res)
})
// Note:
// req.params is used to retrieve parameters from the URL path of a GET request, while req.query is used to retrieve query parameters from the URL of a GET request. For example, if the URL is http://example.com/mahasiswa/123, req.params.id would return 123. On the other hand, if the URL is http://example.com/mahasiswa?id=123, req.query.id would return 123.


app.post("/mahasiswa/", (req, res) => {
    // res.send("Post mahasiswa")
    response(200, "result here", "Post mahasiswa", res)
})
//* --> Buat insert data, pake .post


app.put("/mahasiswa/", (req, res) => {
    // res.send("Update data")
    response(200, "result here", "Update data", res)
})
//* --> Buat update/merubah data di db, pake .put


app.delete("/mahasiswa/", (req, res) => {
    // res.send("Delete data")
    response(200, "result here", "Delete data", res)
})
//* --> Buat delete data di db


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})