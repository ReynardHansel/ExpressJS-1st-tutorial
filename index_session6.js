const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

app.get("/", (req, res) => {
    response(200, "API online (6)", "SUCCESS", res)
})

//* Note:
//* Always console.log dl sblm pake response()

app.get("/mahasiswa/", (req, res) => {
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql, (err, fields) => {
        // console.log(fields)
        if (err) throw err //* if ada error, di cut di sini, code slanjut"nya ga di eksekusi
        response(200, fields, "Get all data from mahasiswa", res)
    })
})

app.get("/mahasiswa/:nim", (req, res) => {
    const nim = req.params.nim
    const sql = `SELECT * FROM mahasiswa WHERE NIM = ${nim}`
    db.query(sql, (err, fields) => {
        // console.log(fields)
        if (err) throw err
        response(200, fields, `Get mahasiswa by nim: ${nim}`, res)
    })
})

app.post("/mahasiswa/", (req, res) => {
    const { nim, namaLengkap, kelas } = req.body
    // console.log(req.body)

    const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas) VALUES (${nim}, '${namaLengkap}', '${kelas}')`
    db.query(sql, (err, fields) => {
        // console.log(fields)
        if (err) response(500, err, "Error", res)

        // console.log({ affRows: fields.affectedRows }) //* to check if data is inserted before going to next part, do this first

        if (fields?.affectedRows){ //* kalau fields nya ada/valid, eksekusi .affectedRows, kalau tidak, ga dilanjut            
            // console.log("Data berhasil di input")

            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,

                //* optional:
                // nim: nim,
                // namaLengkap: namaLengkap,
                // kelas: kelas
            }

            response(200, data, "Post mahasiswa", res)
            //* Note:
            // - data = payload
            // - pakai data, bukan fields, karena fields isinya bnyk bgt, data isinya dari fields jg, tp yg penting aja
        } else {
            console.log("Data gagal di input")
        }
    })
})

app.put("/mahasiswa/", (req, res) => {
    const { nim, namaLengkap, kelas } = req.body
    const sql = `UPDATE mahasiswa SET nama_lengkap = '${namaLengkap}', kelas = '${kelas}' WHERE NIM = ${nim}`

    db.query(sql, (err, fields) => {
        // console.log(fields)
        if (err) response(500, err, "Error", res)
        if (fields?.affectedRows){
           const data = {
                isSuccess: fields.affectedRows,
                message: fields.message
            }

            response(200, data, "Update data successful", res)
        }

        // kalau data yg di update ga ada
        // kalau gapake dibawah ini, express bakal running trs pdhl datanya gada
        else {
            response(404, "Data not found", "Error", res)
        }
    })
})

app.delete("/mahasiswa/", (req, res) => {
    const { nim } = req.body

    const sql = `DELETE FROM mahasiswa WHERE NIM = ${nim}`
    db.query(sql, (err, fields) => {
        // console.log(fields)
        if(err) response(500, err, "Invalid NIM", res)

        if(fields?.affectedRows){
            const data = {
                isDeleted: fields.affectedRows,
            }
            
            response(200, data, "Data Deleted", res)
        } else {
            response(404, "Data not found", "Error", res)
        }
    })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})