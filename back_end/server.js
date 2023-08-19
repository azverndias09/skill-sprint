const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const setupChat = require('./chat');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');

app.use("/user", userRoute);
app.use("/login", loginRoute);

const server = http.createServer();
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
