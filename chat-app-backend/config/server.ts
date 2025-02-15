export default ({ env }) => ({
  host: '0.0.0.0',
  port: parseInt(env('PORT', '10000')),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: false,
  },
});