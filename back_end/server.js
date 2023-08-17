const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRoutes = require('./api/login');
const numbersRoutes = require('./api/numbers');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/login', loginRoutes);

// Use app.get for specific GET route
console.log(numbersRoutes);
app.use(numbersRoutes);

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
