const { Server } = require('socket.io');

function setupChat(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        }
    });

    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);

        socket.on("send_message", (data) => {
            // console.log(data);
            socket.broadcast.emit("receive_message", data);
        });
    });
}

module.exports = setupChat;
