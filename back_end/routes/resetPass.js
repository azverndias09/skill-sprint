const express = require('express');
const router = express.Router();
const mysql = require("mysql");

const bcrypt = require("bcrypt");
router.use(express.json());

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
});

// const pool = mysql.createPool({
//     connectionLimit: 100, //important
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'skillsprint',
//     debug: false
// });

router.post("/", async (req, res) => {
    
    const user = req.body.username;
    const newPass = req.body.password;
    const hashedPassword = await bcrypt.hash(newPass, 10);
    // res.send("User route is displaying data")
   
    db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "Select * from users where Name = ?"
        const search_query = mysql.format(sqlSearch, [user])

        await connection.query(search_query, (err, result) => {
            connection.release();
            console.log("Working");

            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }

            if (result.length == 0) {
                console.log("User does not exist");
                return res.sendStatus(301);
            } else {
                db.query('UPDATE users SET Password = ?  WHERE Name = ?', [hashedPassword, user], (error) => {
                    if (error) {
                        console.error('Error updating password:', error);
                        return res.sendStatus(500);
                    }

                    console.log('Password change successful!');
                    res.send(`${user} has changed password successfully!`);
                });
            }
        });
        
    })
});

module.exports = router