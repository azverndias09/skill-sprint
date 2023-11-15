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

// router.post('/:UId', async (req, res) => {
//     const servicename = req.body.servicename;
//     const servicedescription = req.body.servicedescription;
//     const price = req.body.price;
//     const uid=req.params.UId

 

//     try {

//         if (req.files && req.files.servicephoto) {
//             const servicephoto = req.files.servicephoto;

//             // Specify the path where you want to save the uploaded file
//             const filePath = 'C:\Users\jason\Documents\VS Code Programs\skill-sprint\database\serviceimages' + servicephoto.name;

//             // Move the file to the specified path
//             servicephoto.mv(filePath, function (err) {
//                 if (err) {
//                     console.error('Error saving uploaded file:', err);
//                     return res.status(500).json({ error: 'Internal Server Error' });
//                 }
//             });


//         const getbid = 'SELECT BId FROM skillsprint.business WHERE UId = ?';
//         const getbidvalues = [uid];

        
//         let result;
//         try {
//             result = await db.query(getbid, getbidvalues);
//             console.log('Query Result:', result);
//         } catch (queryError) {
//             console.error('Error executing getbid query:', queryError);
//             throw queryError; // Rethrow the error to handle it in the outer catch block
//         }


//         const bid = result && result.length > 0 ? result[0].BId : null;

//         console.log('Business ID:', bid);

//         const sql = `INSERT INTO services (BId,SId,Servicename, Servicedescription,Price)
//             VALUES (?,0,?, ?,?)`;

//         const values = [bid, servicename, servicedescription, price];
//         await db.query(sql, values);

//         res.status(201).json({ message: 'Service saved successfully.' });
//     } 
//     catch (error) {
//         console.error('Error saving profile:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });//end of router.post()



router.post('/', async (req, res) => {
router.post('/', async (req, res) => {
    try {
        const servicename = req.body.servicename;
        const servicedescription = req.body.servicedescription;
        const price = req.body.price;
        //const uid = req.params.UId;
        const uid=req.body.uid;

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

        // const bid = result && result.length > 0 ? result[0].BId : null;
        const bid=7;
        // const bid = result && result.length > 0 ? result[0].BId : null;
        const bid=7;

        console.log('Business ID:', bid);
        console.log('Business ID:', bid);

        const sql = `INSERT INTO skillsprint.services (BId, SId, Servicename, Servicedescription, Price)
            VALUES (?, 0, ?, ?, ?)`;
        const sql = `INSERT INTO skillsprint.services (BId, SId, Servicename, Servicedescription, Price)
            VALUES (?, 0, ?, ?, ?)`;

        const values = [bid, servicename, servicedescription, price];
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error inserting service details:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(201).json({ message: 'Service saved successfully.' });
            }
        const values = [bid, servicename, servicedescription, price];
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error inserting service details:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(201).json({ message: 'Service saved successfully.' });
            }
        });
    } catch (error) {
        console.error('Error saving service details:', error);
        console.error('Error saving service details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





module.exports = router