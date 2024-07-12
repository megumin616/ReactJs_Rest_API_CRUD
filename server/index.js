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
                return res.status(400).send();
            } else {
                return res.status(200).send(results);
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});


//Post data
app.post('/create', (req, res) => {
    const {name, phone, address} = req.body
    try {
        db.query("INSERT INTO users(name, phone, address) VALUES(?,?,?)", [name, phone, address], (err, results) => {
            if (err) {
                console.log('Error', err)
                return res.status(400).send();
            } else {
                return res.status(200).send(results);
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send();
    }
})


//Get data id
app.get('/read/:id', (req, res) => {
    const id = req.params.id
    try {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
            if(err) {
                console.log(err)
                return res.status(400).send()
            } else {
                return res.status(200).send(results)
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
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
                return res.status(400).send()
            } return res.status(200).send()
        })
    } catch(err) {
        console.log(err)
        return res.status(500).send()
    }
})



//Delete data
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    try {
        db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
            if(err) {
                return res.status(400).send()
            } return res.status(200).send()
        })
    } catch(err) {
        return res.status(500).send()
    }
})




app.listen(3031, () => {
    console.log("Connect server successfully")
})