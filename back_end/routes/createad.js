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

router.post('/:UId', async (req, res) => {
    const servicename = req.body.servicename;
    const servicedescription = req.body.servicedescription;
    const price = req.body.price;
    const uid=req.params.UId
    const servicephoto=req.body.servicephoto;

 

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

        const sql = `INSERT INTO services (BId,SId,Servicename, Servicedescription,Price)
            VALUES (?,0,?, ?,?)`;

        const values = [bid, servicename, servicedescription, price];
        await db.query(sql, values);

        res.status(201).json({ message: 'Service saved successfully.' });
    } 
    catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }




});//end of router.post()


module.exports = router
