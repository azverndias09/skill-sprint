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




router.get('/:UId', async (req, res) => {
    const uid = req.params.UId;
    console.log('Received UId:', uid); // Check if the UId is received correctly

    try {
        const getBidQuery = 'SELECT BId FROM skillsprint.business WHERE UId = ?';
        const getBidValues = [uid];

        await db.query(getBidQuery, getBidValues, (err, results) => {
            if (err)
            {
                console.error('Error fetching data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } 
            else 
            {
                if (results.length > 0) {
                    const bid = results[0].BId;
                    console.log("bidresult:", bid);
                   // res.status(200).send("works");

                    const query = `SELECT s.SId, b.Businessname, b.City, b.State, s.Servicename, s.Price, s.Servicephoto
                                    FROM skillsprint.business AS b
                                    INNER JOIN skillsprint.services AS s ON b.BId = s.BId
                                    WHERE s.BId = ?`;

                    const values = [bid];

                     db.query(query, values, (err, results) => {
                                if (err)
                                {
                                    console.error('Error fetching data:', err);
                                    res.status(500).json({ error: 'Internal Server Error' });
                                } 
                                else
                                {
                                    res.status(200).json(results);
                                    console.log(results);
                                }
                                });

                                

                    
                } else {
                    console.log('No BId found');
                    res.status(404).send('No BId found');
                }
            }
        });

    
    //         const query = `SELECT s.SId, b.Businessname, b.City, b.State, s.Servicename, s.Price, s.Servicephoto
    //             FROM skillsprint.business AS b
    //             INNER JOIN skillsprint.services AS s ON b.BId = s.BId
    //             WHERE s.BId = ?`;

    //         const values = [bid];

    //         // Execute query using the retrieved BId
    //         await db.query(query, values, (err, results) => {
    //             if (err) {
    //                 console.error('Error fetching data:', err);
    //                 res.status(500).json({ error: 'Internal Server Error' });
    //             } else {
    //                 res.status(200).json(results);
    //                 console.log(results);
    //             }
    //         });
    //     } else {
    //         // If no BId found for the given UId
    //         res.status(404).json({ message: 'No business found for the given UId.' });
    //     }
    } catch (err) {
        console.error('Error occurred during query execution:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router
