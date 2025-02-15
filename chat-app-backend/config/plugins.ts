export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        secret: env('JWT_SECRET')
      }
    }
  }
});
