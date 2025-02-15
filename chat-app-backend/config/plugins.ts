export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        secret: env('PLUGIN_USERS_PERMISSIONS_JWT_SECRET', 'gMdDFpk3WHt2GkUFnj2YJQ==')
      }
    }
  }
});
