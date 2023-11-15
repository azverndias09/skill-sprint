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



router.get('/businesshome/:UId', async (req, res) => {

    const uid = req.params.UId


    try {


        const getbid = 'SELECT BId FROM skillsprint.business WHERE UId = ?';
        const getbidvalues = [uid];

        let result;
        try {
            result = await db.query(getbid, getbidvalues);
            console.log('Query Result:', result);
        } catch (queryError) {
            console.error('Error executing getbid query:', queryError);
            throw queryError; // Rethrow the error to handle it in the outer catch block
        }


        const bid = result && result.length > 0 ? result[0].BId : null;

        console.log('Business ID:', bid);

        const query = `SELECT s.SId,b.Businessname, b.City, b.State, s.Servicename, s.Price, s.Servicephoto
FROM skillsprint.business AS b
INNER JOIN skillsprint.services AS s ON b.BId = s.BId where s.BId=?`;
        
        const values=[bid]

        await db.query(query, values,(err, results) => {
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
