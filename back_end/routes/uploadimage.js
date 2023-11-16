const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const mysql = require('mysql');

const upload = multer({ dest: 'temp/'});



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
   // console.log("DB connection successful!" + connection.threadId)
})

router.post('/', upload.single('image'), (req, res) => {
    const sid = req.body.sid;

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    
    const image = req.file;  // Corrected from req.image to req.file
    
    const tempImagePath = image.path;

    // Logic to move file to destination folder (serviceimages)
    const serviceImagesFolder = `${__dirname}/../database/serviceimages`;
    fs.mkdirSync(serviceImagesFolder, { recursive: true });
    const imagePath = `${serviceImagesFolder}/${image.originalname}`;

    fs.rename(tempImagePath, imagePath, (err) => {
        if (err) {
            console.error('Error storing image:', err);
            return res.status(500).send('Error storing image.');
        }

        
        const query = `UPDATE skillsprint.services SET Servicephoto = ? WHERE SId = ?;`;
        const values = [imagePath, sid];

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error running query:', err);
                res.status(500).send('Error storing image in MySQL');
            } else {
                res.send(`Image stored successfully at ${imagePath}`);
            }
        });
    });
});


module.exports=router