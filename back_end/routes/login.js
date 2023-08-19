const express = require('express');
const router = express.Router();


const users = [
    { id: 1, username: 'user', password: 'password' }
];

router.post('/', (req, res) => {

    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ message: 'Login successful' });
        console.log("backend login done");
    } else {
        console.log(user);
        console.log(req.body);
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
