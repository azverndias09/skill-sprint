const express = require('express');
const http = require('http');
const cors = require('cors');
//const setupChat = require('./chat');

const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const resetpassRoute = require('./routes/resetPass');
const paymentRoutes = require("./routes/payment");
const locationRoute = require("./routes/location");
const clientprofileRoute=require("./routes/clientprofile");
const businessprofileRoute = require("./routes/businessprofile");


const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/user", userRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/resetPass", resetpassRoute);
app.use("/clientprofile",clientprofileRoute);
app.use("/businessprofile", businessprofileRoute);
app.use("/api/payment/", paymentRoutes);
app.use("/location", locationRoute);

//setupChat(server);

server.listen(3001, () => {
    console.log("Server Listening on PORT:", 3001);
});

app.get("/status", (req, res) => {
    const status = {
        "Status": "running!"
    };
    res.send(status);
});
