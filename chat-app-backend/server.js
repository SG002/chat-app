const strapi = require('@strapi/strapi');
const app = strapi({
  autoReload: false,
  serveAdminPanel: false, 
});

const startServer = async () => {
  try {
    await app.load();
    await app.start();
    
    const port = process.env.PORT || 10000;
    app.server.httpServer.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Server failed to start:', error);
    process.exit(1);
  }
};

startServer();

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  app.destroy()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}); 