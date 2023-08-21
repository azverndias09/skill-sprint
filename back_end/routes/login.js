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

    const user = req.body.username
    const password = req.body.password

    db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "Select * from users where Name = ?"
        const search_query = mysql.format(sqlSearch, [user])

        await connection.query(search_query, async (err, result) => {

            connection.release()

            if (err) throw (err)

            if (result.length == 0) {
                console.log("--------> User does not exist")
                res.sendStatus(404)
            } 

            else {
                const hashedPassword = result[0].password
     //get the hashedPassword from result
            
                if (await bcrypt.compare(password, hashedPassword)) {
                    console.log("---------> Login Successful")
                    res.send(`${user} is logged in!`)
                } 

                else {
                    console.log("---------> Password Incorrect")
                    res.send("Password incorrect!")
                } //end of bcrypt.compare()
            }//end of User exists i.e. results.length==0
        }) //end of connection.query()
    }) //end of db.connection()
}); //end of router.post()

            // const { username, password } = req.body;
    // const user = users.find(u => u.username === username && u.password === password);

    // if (user) {
    //     res.json({ message: 'Login successful' });
    //     console.log("backend login done");
    // } else {
    //     console.log(user);
    //     console.log(req.body);
    //     res.status(401).json({ message: 'Invalid credentials' });
    // }


module.exports = router;
