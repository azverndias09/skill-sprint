const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const fileUpload = require('express-fileupload');

router.use(fileUpload());


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
    
    const uid = req.params.UId; 
    const servicename=req.body.servicename;
    const servicedescription = req.body.servicedescription;
    const price=req.body.price;

    console.log('Received UId:', uid); 

    try {
        const getBidQuery = 'SELECT BId FROM skillsprint.business WHERE UId = ?';
        const getBidValues = [uid];

        await db.query(getBidQuery, getBidValues, (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else {
                if (results.length > 0) {
                    const bid = results[0].BId;
                    console.log("bidresult:", bid);
                    // res.status(200).send("works");

                    const query = `INSERT INTO services (SId, Servicename, Servicedescription, Price, BId)
                                        VALUES(0,?,?,?, ?)`;

                    const values = [servicename,servicedescription,price,bid];

                    db.query(query, values, (err, results) => {
                        if (err) {
                            console.error('Error fetching data:', err);
                            res.status(500).json({ error: 'Internal Server Error' });
                        }
                        else {
                            const insertedId = results.insertId; // Get the SId of the newly inserted record
                            res.status(200).json({ sid: insertedId }); // Send the SId to the client
                            console.log('Inserted SId:', insertedId);
                        }
                    });




                } else {
                    console.log('No BId found');
                    res.status(404).send('No BId found');
                }
            }
        });


    } catch (err) {
        console.error('Error occurred during query execution:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});









module.exports = router