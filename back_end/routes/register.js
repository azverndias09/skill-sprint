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

const bcrypt = require("bcrypt")
const saltRounds=10

router.post('/',async (req,res)=>{
    const username = req.body.name;
    const email = req.body.email;
    const pword=req.body.password;
    const usertype=req.body.userType   //const hashedPassword = await bcrypt.hash(req.body.password, 10);
    async function hashPassword(pword){
        const hashedPassword = await bcrypt.hash(pword, 10);
        return hashedPassword;
    }

    db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM users WHERE Username = ?"
        const search_query = mysql.format(sqlSearch, [username])
        const sqlInsert = "INSERT INTO  users (UId,Username,Email,Password,Usertype) VALUES (0,?,?,?,?)";
        const insert_query = mysql.format(sqlInsert, [username, email, await hashPassword(pword),usertype])

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
                   // connection.release()
                    if (err) throw (err)
                    console.log("--------> Created new User")
                    const UserId = result.insertId; // Get the newly inserted UId

                    connection.release();
                    res.status(201).json({ UId: UserId });

                
                })
            }
        }) //end of connection.query()
    }) //end of db.getConnection()
});//end of router.post()


module.exports = router ;
