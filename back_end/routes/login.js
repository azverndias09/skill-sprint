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

// const port = process.env.PORT
// app.listen(port,
//     () => console.log(`Server Started on port ${port}...`))


db.getConnection((err, connection) => {
    if (err) throw (err)
    console.log("DB connection successful!" + connection.threadId)
})

const bcrypt = require("bcrypt")
router.use(express.json())
// const users = [
//     { id: 1, username: 'user', password: 'password' }
// ];

router.post('/', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "Select * from users where Username = ?"
        const search_query = mysql.format(sqlSearch, [username])

        await connection.query(search_query, async (err, result) => {

            connection.release()

            if (err){ 
                res.sendStatus(500);
                console.log(err);
                console.log(res);
            }

            if (result.length == 0) {
                console.log("--------> User does not exist")
                res.sendStatus(301)
            } 

            else {
                const hashedPassword = result[0].Password
     //get the hashedPassword from result
        
                if (await bcrypt.compare(password, hashedPassword)) {
                    console.log("---------> Login Successful");
                    res.status(200);
                    res.send(`${username} is logged in!`);
                    const UserId = result.insertId; // Get the newly inserted UId

                    connection.release();
                    res.status(201).json({ UId: UserId });
                   
                } 

                else {
                    console.log("---------> Password Incorrect")
                  
                    res.status(302);
                    res.send("Password incorrect!")
                } 
            }
        }) 
    }) 
}); 

        

module.exports = router;
