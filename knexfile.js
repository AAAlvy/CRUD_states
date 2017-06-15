// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/state'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/test-state'
    },
  };
