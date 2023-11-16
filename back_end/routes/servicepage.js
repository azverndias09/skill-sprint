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
    const bid=req.body.bid;
    console.log("Received SId: ",sid);

    // let dummyresult =
    //     [
    //         {
    //             "SId": 30,
    //             "Businessname": "Surf School",
    //             "City": "Margao",
    //             "State": "Goa",
    //             "Servicename": "Surfing Lessons",
    //             "Price": 2000,
    //             "Servicephoto": "skill-sprint/database/serviceimages/Freelancer-start-1024x512.png",
    //             "Servicedescription":"Learn to surf!",
    //             "Phone": 6665554443
    //         }
    //     ]

    try {
        const getservicequery = `SELECT b.BId,s.Servicename, s.Price, b.City, b.State, b.Businessname, b.Phone, s.Servicephoto, s.Servicedescription
                                 FROM skillsprint.business AS b JOIN skillsprint.services AS s ON b.BId = s.BId WHERE s.SId = ?`;
        const getservicevalues = [sid];

        const getratingquery='SELECT AVG(Rating) as Rating, COUNT(*) as Numberofratings FROM Ratings WHERE RatedbusinessBId = ?';
        const getratingvalues=[bid];

        let resultsArray=[];
        let combinedResults=[];

        await db.query(getservicequery, getservicevalues, (err, results1) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else {
                    resultsArray.push({serviceData:results1})
                    console.log(results1);

                    db.query(getratingquery, getratingvalues, (err, results2) => {
                        if (err) {
                            console.error('Error fetching data:', err);
                            res.status(500).json({ error: 'Internal Server Error' });
                        }
                        else {
                            resultsArray.push({ ratingsData: results2 })
                            console.log(results2);
                            combinedResults = resultsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                            res.status(200).json(combinedResults);
                            console.log(combinedResults);


                        }
                    });

            }
        });



    } catch (err) {
        console.error('Error occurred during query execution:', err);
        //res.json(dummyresult);
        res.status(500).json({ error: 'Internal Server Error' });
        
    }
});


module.exports = router
