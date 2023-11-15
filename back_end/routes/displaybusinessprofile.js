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
    //  console.log("DB connection successful!" + connection.threadId)
})



router.get('/:UId', (req, res) => {

    const uid = req.params.UId;
    console.log(uid); 


    try {
        const getbusinessprofilequery = `SELECT b.Businessname, u.Username, b.Businessdescription, b.Phone, b.City, b.State
                            FROM skillsprint.business AS b JOIN skillsprint.users AS u ON b.UId = u.UId WHERE u.UId = ?`;

        const getbusinessprofilevalues=[uid];
        
        db.query(getbusinessprofilequery, getbusinessprofilevalues ,(err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json(results);
                console.log(results);
            }
        });
    } catch (err) {
        console.error('Error occurred during query execution:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }


});


module.exports = router
