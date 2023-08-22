const express = require('express');
const router = express.Router();

const bcrypt = require("bcrypt");
router.use(express.json());

router.get("/", async (req, res) => {
    
    const email = req.body.email;
    const newPass = req.body.newPass;
    const hashedPassword = await bcrypt.hash(newPass, 10);
    // res.send("User route is displaying data")
    //    
    // write dbLogic here jason noob
})
module.exports = router;