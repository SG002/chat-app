const strapi = require('@strapi/strapi');

const app = strapi({ 
  autoReload: false,
  serveAdminPanel: true,
});

const port = process.env.PORT || 10000;

app.start().then(() => {
  app.server.httpServer.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}); 