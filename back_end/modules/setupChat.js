const socketIo = require('socket.io');

function setupChat(server) {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle chat messages
    socket.on('chat message', (message) => {
      // Broadcast the message to all connected clients
      io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
}

module.exports = setupChat;
