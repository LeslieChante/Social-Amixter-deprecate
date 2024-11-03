module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'db', // Asegúrate de que esté apuntando a 'db'
      user: process.env.DB_USER || 'devWebpro',
      password: process.env.DB_PASSWORD || 'amixte123',
      database: process.env.DB_NAME || 'social_network_db'
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
  };
  