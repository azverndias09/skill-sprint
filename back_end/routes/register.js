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
    user: DB_USER,        // "newuser" created in Step 1(e)
    password: DB_PASSWORD,   // password for the new user
    database: DB_DATABASE,      // Database name
    port: DB_PORT          // port name, "3306" by default
})

db.getConnection((err, connection) => {
    if (err) throw (err)
    console.log("DB connection successful!" + connection.threadId)
})

const bcrypt = require("bcrypt")
router.use(express.json())

router.post('/',async (req,res)=>{
    const user = req.body.name;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM users WHERE Name = ?"
        const search_query = mysql.format(sqlSearch, [user])
        const sqlInsert = "INSERT INTO  users (UId,Name,Email,Password) VALUES (0,?,?,?)";
        const insert_query = mysql.format(sqlInsert, [user, email, hashedPassword])

        await connection.query(search_query, async (err, result) => {
            if (err) throw (err)
            console.log("------> Search Results")
            console.log(result.length)
            if (result.length != 0) {
                connection.release()
                console.log("------> User already exists")
                res.sendStatus(409)
            }
            else {
                await connection.query(insert_query, (err, result) => {
                    connection.release()
                    if (err) throw (err)
                    console.log("--------> Created new User")
                    console.log(result.insertId)
                    res.sendStatus(201)
                })
            }
        }) //end of connection.query()
    }) //end of db.getConnection()
});//end of router.post()


module.exports = router;
