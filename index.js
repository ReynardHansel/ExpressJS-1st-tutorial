const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json()) //* --> data yg ditrima dr frontend diubah menjadi json

app.get('/', (req, res) => {
  // console.log({ urlParams: req.query }) //? from postman Params (not completely understood)

  //* Koneksi db terjadi saat '/' nya dibuka,
  //? saat '/' dibuka, query di db.query lgsg jalan (mungkin gt)
  const sql = "SELECT * FROM mahasiswa"
  db.query(sql, (error, result) => {
    // res.send(result)
    // console.log(result)
    // console.log(error)

    response(200, result, "get all data from mahasiswa", res)
    console.log("query should've happened now and fired")
  })
  // res.send('Hello World!')
})

app.get('/find-nim', (req, res) => {
  const sql = `SELECT nama_lengkap FROM mahasiswa WHERE NIM = ${req.query.NIM}`
  db.query(sql, (error, result) => {
    response(200, result, "Found mahasiswa with NIM: ", res)
  })
  console.log("Found NIM: ", req.query.NIM) //* to check if the query is working
})

app.post('/login', (req, res) => {
  // console.log(req.body) //* --> undefined on terminal

  console.log({requestFromOutside: req.body}) 
  //* Notes:
  // --> { requestFromOutside: undefined } on terminal
  // requestFromOutside = key
  // --> Better troubleshooting
  // (?) key bisa apa aja namanya bebas, biar tau aja data yg didapet key nya apa biar lbh gampang diidentifikasi
  // Stelah install body-parser, baru kluar datanya
  
  // console.log({requestFromOutside: req})
  //* Notes:
  // Semua yg didapet dari req di-log-kan (banyak bgt)
  // (?) Tp ntah knapa si bodynya masi gamasuk --> solution(blm paham spenuhnya) = npm i body-parser

  res.send('Logged in')
})

app.put('/username', (req, res) => {
  console.log({ updateData: req.body })
  res.send('updated')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})