const express = require('express');
const router = express.Router();

router.get('/numbers', (req, res) => {
    console.log("test");
    const numbersString = "1 2 3 4 5";
    res.json({ numbers: numbersString }); // Sending as an object with a "numbers" property
});

module.exports = router;
