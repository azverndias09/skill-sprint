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
    //console.log("DB connection successful!" + connection.threadId)
})



router.post('/', async (req, res) => {

    const cid = req.body.cid;
    const bid=req.body.bid;
    const rating=req.body.rating;

    try {
        const query = `INSERT INTO ratings (RId,RatedbyCId,RatedBusinessBId,Rating) VALUES(0,?,?,?)`;
        const values = [cid, bid, rating];

        db.query(query, values, async (err, results) => {
            if (err) {
                console.error('Error inserting data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                try {
                    
                    res.status(200);
                    res.send("Rating given!");
                  
                    
                } catch (insertError) {
                    console.error('Error occurred during insert handling:', insertError);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    } catch (error) {
        console.error('Error occurred during query execution:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});









module.exports = router
