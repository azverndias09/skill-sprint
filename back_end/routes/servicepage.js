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
})



router.get('/:SId', async (req, res) => {
    const sid = req.params.SId;
    console.log(sid);

    let dummyresult =
        [
            {
                "SId": 30,
                "Businessname": "Surf School",
                "City": "Margao",
                "State": "Goa",
                "Servicename": "Surfing Lessons",
                "Price": 2000,
                "Servicephoto": "skill-sprint/database/serviceimages/Freelancer-start-1024x512.png",
                "Servicedescription":"Learn to surf!",
                "Phone": 6665554443
            }
        ]

    try {
        const getservicequery = `SELECT s.SId, s.Servicename, s.Price, b.City, b.State, b.Businessname, b.Phone, s.Servicephoto, s.Servicedescription
                                FROM skillsprint.business AS b
                                JOIN skillsprint.services AS s ON b.BId = s.BId
                                WHERE s.SId = ?`;

        const [results] = await db.query(getservicequery, [sid]);

        res.status(200).json(results);
        console.log(results);
    } catch (err) {
        console.error('Error occurred during query execution:', err);
        res.json(dummyresult);
        res.status(500).json({ error: 'Internal Server Error' });
        
    }
});


module.exports = router
