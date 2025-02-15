'use strict';

module.exports = {
  register({ strapi }) {
    strapi.server.registerMiddleware({
      name: 'socketio',
      configure: ({ strapi }) => {
        const io = require('socket.io')(strapi.server.httpServer, {
          cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            allowedHeaders: ['*'],
            credentials: true,
          },
          transports: ['polling']
        });
        strapi.io = io;

        
        io.on('connection', (socket) => {
          console.log('New client connected'); // Socket.io connection handling

          socket.on('message', (data) => {
            console.log('Received message:', data);
            socket.emit('message', {
              message: data.message,
              sender: data.userId,
              timestamp: new Date()
            });
          });

          socket.on('disconnect', () => {
            console.log('Client disconnected');
          });
        });
      }
    });
  },

  bootstrap({ strapi }) {},
};