import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_react_crud',
    port: '3306'
})

db.connect((err) => {
    if(err) {
        console.log('Database connect false')
    } else {
        console.log('Database connect successfully')
    }
})

//Get data
app.get('/', (req, res) => {
    try {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) {
                console.log("Error", err)
                // return res.status(400).send();
                return res.status(400).json({message: "Error geting data"})
            } else {
                // return res.status(200).send(results);
                return res.status(200).json({message: "Get data succlessfully", results})
            }
        });
    } catch (err) {
        console.log(err);
        // return res.status(500).send();
        return res.status(500).json({message: "Server error", error: err})
    }
});


//Add data
app.post('/create', (req, res) => {
    const {name, phone, address} = req.body
    try {
        db.query("INSERT INTO users(name, phone, address) VALUES(?,?,?)", [name, phone, address], (err, results) => {
            if (err) {
                console.log('Error', err)
                return res.status(400).json({message: "Error inserting data", error: err});
                //error: err ที่ต้องใส่ทั้งหน้าและหลัง เพราะว่ารูปแบบที่ส่งกลับ เป็น JSON วึ่งต้องมีหน้าและหลัง
            } else {
                return res.status(200).json({message: "Data inserted successfully", results});
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Server error"});
    }
})


//Get data id
app.get('/read/:id', (req, res) => {
    const id = req.params.id
    try {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
            if(err) {
                console.log(err)
                return res.status(400).json({message: "Error reading data", error: err})
            } else {
                return res.status(200).json({message: "Read data successfully", results})
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Server error"})
    }
})


//Update data
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const {name, phone, address} = req.body;

    try {
        db.query('UPDATE users SET name = ?, phone = ?, address = ? WHERE id = ?', [name,phone,address,id], (err, results) => {
            if(err) {
                console.log(err)
                return res.status(400).json({message: "Error updating data", error: err});
            } return res.status(200).json({message: "Update data successfully", results});
        })
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: "Server error"})
    }
})



//Delete data
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    try {
        db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
            if(err) {
                console.log('Error deleting data', err)
                return res.status(400).json({message: "Error deleting data", error: err});
            }
            else if (results.affectedRows === 0) { //ถ้าไม่มีข้อมูลที่ตรงกับ id
                return res.status(404).json({message: "Data not found"})
            }
            else {
                return res.status(200).json({message: "Data delete successfully"})
            }
        })
    } catch(err) {
        console.log("Server error", err)
        return res.status(500).json({message: "Server err", error: err});
    }
})




app.listen(3031, () => {
    console.log("Connect server successfully")
})