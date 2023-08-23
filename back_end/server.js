const express = require('express');
const http = require('http');
const cors = require('cors');
const setupChat = require('./chat');

const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const resetpassRoute = require('./routes/resetPass');

const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());



app.use("/user", userRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/resetPass", resetpassRoute);


setupChat(server);

server.listen(3001, () => {
    console.log("Server Listening on PORT:", 3001);
});

app.get("/status", (req, res) => {
    const status = {
        "Status": "running bruv"
    };
    res.send(status);
});
