const express = require('express');
const router = express.Router();
const mysql = require("mysql");


require("dotenv").config()
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const db = mysql.createPool({
    connectionLimit: 100,
    host: DB_HOST,       //This is your localhost IP
    user: DB_USER,        // "newuser"
    password: DB_PASSWORD,   // password 
    database: DB_DATABASE,      // Database name
    port: DB_PORT          // port name, "3306"
})

db.getConnection((err, connection) => {
    if (err) throw (err)
    console.log("DB connection successful!" + connection.threadId)
})

router.post('/:UId', async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const contactnumber = req.body.contactnumber;
    const city = req.body.city
    const state = req.body.state
    const uid = req.params.UId;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    console.log('Received UId:', uid);


    try {
        const sql = `INSERT INTO skillsprint.client (UId, CId, Firstname, Lastname, Phone, City, State, Latitude, Longitude)
        VALUES (?, 0, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [uid, firstname, lastname, contactnumber, city, state, latitude, longitude];

        await db.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error saving profile:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(201).json({ message: 'Client Profile saved successfully.' });
                console.log(results)
            }
        });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router
