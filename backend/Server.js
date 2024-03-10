const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "daya",
    password: "password",
    database: "survey"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as ID ' + db.threadId);
});

// Route for signup page
app.post('/signup', (req, res) => {
    console.log("/signup hit------");
    console.log("req body-------", req.body);
    const sql = "INSERT INTO signup (`id`, `name`,`email`,`password`) VALUES (?, ?, ?, ?)";
    const id = uuidv4();
    const values = [
        id,
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.message);
            return res.status(500).json({ error: 'Error inserting data' });
        }
        console.log('Data inserted successfully.');
        return res.json(result);
    });
});

// Route for Login page
app.post('/login', (req, res) => {
    console.log("/login hit------");
    console.log("req body-------", req.body);
    const sql = "SELECT * FROM signup WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) {
            console.error('Error inserting login data: ' + err.message);
            return res.status(500).json({ error: 'Error inserting login data' });
        }
        if(result.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failure")
        }
    });
});


// Route for Home page
app.post('/home', (req, res) => {
    console.log("/home hit------");
    console.log("req body-------", req.body);
    const sql = "INSERT INTO home (`id`, `name`, `surname`, `age`, `dob`, `email`) VALUES (?, ?, ?, ?, ?, ?)";
    const id = uuidv4();
    const values = [
        id,
        req.body.name,
        req.body.surname,
        req.body.age,
        req.body.dob,
        req.body.email
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.message);
            return res.status(500).json({ error: 'Error inserting data' });
        }
        console.log('Data inserted successfully.');
        return res.json(result);
    });
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});

