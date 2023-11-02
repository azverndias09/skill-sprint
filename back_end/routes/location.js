const express = require('express')

const router = express.Router();
const unirest = require("unirest");


router.get("/location", (req, res) => {
    var apiCall = unirest("GET",
        "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"
        
    );

    // params({
    //     ip: '103.119.208.87'
    // });

    apiCall.headers({
        "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
        "x-rapidapi-key": "adcd7c0ed8msh37e1c8ee72406e2p17af8fjsne41e4188d10a"
    });
    apiCall.end(function (result) {
        if (res.error) throw new Error(result.error);

        const country = result.body.country;
        const city = result.body.city;
        const latitude = result.body.latitude;
        const longitude = result.body.longitude;

        // Create an object with extracted data
        const location = {
            country,
            city,
            latitude,
            longitude,
        };
        console.log(location);
        res.send(location);
    });
});




module.exports = router;









