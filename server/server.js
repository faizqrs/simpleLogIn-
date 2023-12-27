const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error('MySQL query error:', err);
            return res.json('Error');
        }
        if (data.length > 0) {
            return res.json('Login Successfully');
        } else {
            return res.json('No Record');
        }
    });
});

app.listen(8081, () => {
    console.log("server is running on port 8081");
});
