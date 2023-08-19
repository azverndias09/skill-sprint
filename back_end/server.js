const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');


app.use("/user", userRoute);
app.use("/login", loginRoute);



app.listen(3001, () => {
    console.log("Server Listening on PORT:", 3001);
});

app.get("/status", (req, res) => {
    const status = {
        "Status": "running bruv"
    };
    res.send(status);
}

);



// const cors = require('cors');
// const bodyParser = require('body-parser');
// const loginRoutes = require('./api/login');
// const numbersRoutes = require('./api/numbers');

// const app = express();

// app.use(bodyParser.json());
// app.use(cors());

// app.use('/api/login', loginRoutes);

// // Use app.get for specific GET route
// console.log(numbersRoutes);
// app.use(numbersRoutes);

// const port = 3001;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
