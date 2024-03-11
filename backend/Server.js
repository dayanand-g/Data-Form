const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "bb91ape4lioacaeo0rri-mysql.services.clever-cloud.com",
    user: "u9jebv8sh7aq0rpj",
    password: "7ZUAyCZnXTAA3iPi0JAu",
    database: "bb91ape4lioacaeo0rri"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as ID ' + db.threadId);
});

app.get("/", (req,res) => {
    res.send("Server is runnig")
})

// Route for signup page
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO signup (`name`,`email`,`password`) VALUES (?, ?, ?)";
    const values = [
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
    const sql = "INSERT INTO home (`name`, `surname`, `age`, `dob`, `email`) VALUES (?, ?, ?, ?, ?)";
    const values = [
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


app.listen(5000, console.log("Server is listening on port 5000"));

// module.exports = pool.promise()
