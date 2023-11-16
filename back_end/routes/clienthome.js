const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const app=express();


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



router.get('/:UId', async (req, res) => {

    const uid=req.params.UId;

    try {

        const getcidQuery = 'SELECT CId FROM skillsprint.client WHERE UId = ?';
        const getcidValues = [uid];

        await db.query(getcidQuery, getcidValues, (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else {
                if (results.length > 0) {
                    const cid = results[0].CId;
                    console.log("cidresult:", cid);


                        const getservicesquery = `SELECT s.SId, b.Businessname, b.City, b.State, s.Servicename, s.Price, b.Latitude, b.Longitude
                                        FROM business b INNER JOIN services s ON b.BId = s.BId`;

                        const getclientlocationquery='SELECT Latitude, Longitude from skillsprint.Client where CId=?';
                        const getclientlocationvalues=[cid];

                        db.query(getservicesquery, (err, serviceDetails) => {
                            if (err) {
                                console.error('Error fetching data:', err);
                                res.status(500).json({ error: 'Internal Server Error' });
                            } else {

                                db.query(getclientlocationquery, getclientlocationvalues, (err, clientLocation) => {
                                    if (err) {
                                        console.error('Error fetching data:', err);
                                        res.status(500).json({ error: 'Internal Server Error' });
                                    } else {
                                        console.log(serviceDetails);
                                        console.log(clientLocation);

                                        const distances = [];
                                        clientLocation.forEach(client => {
                                            serviceDetails.forEach(service => {
                                                const distance = calculateDistance(client.Latitude, client.Longitude, service.Latitude, service.Longitude);
                                                distances.push({ ...service, distance });
                                            });
                                        });

                                        //res.status(200).json(distances);


                                        res.status(200).json({distances});
                                    }
                                });

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

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}


module.exports=router;




