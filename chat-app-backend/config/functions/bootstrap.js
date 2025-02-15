'use strict';

module.exports = async ({ strapi }) => {
  
  const io = require('socket.io')(strapi.server.httpServer, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['polling']
  });

  strapi.io = io;

  io.on('connection', (socket) => {
    console.log('New client connected');

    
    socket.on('message', async (data) => {
      try {
        
        socket.emit('message', {
          message: data.message,
          sender: data.userId,
          timestamp: new Date()
        });
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });

    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};