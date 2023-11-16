const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const app=express();


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



router.get('/', async (req, res) => {
    try {
        const query = `SELECT s.SId, b.Businessname, b.City, b.State, s.Servicename, s.Price, b.Latitude, b.Longitude
                        FROM business b INNER JOIN services s ON b.BId = s.BId`;

        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log("Hello");
                console.log(results);
                res.status(200).json(results); // Send the response here
            }
        });
    } catch (err) {
        console.error('Error occurred during query execution:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports=router;




