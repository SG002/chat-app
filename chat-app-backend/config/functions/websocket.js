module.exports = (strapi) => {
  const io = require('socket.io')(strapi.server.httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', async (data) => {
      try {
        const savedMessage = await strapi.entityService.create('api::message.message', {
          data: {
            content: data.message,
            sender: data.userId,
            sessionId: data.sessionId,
            timestamp: new Date()
          }
        });
        socket.emit('message', {
          message: data.message,
          timestamp: savedMessage.timestamp,
          id: savedMessage.id
        });
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
