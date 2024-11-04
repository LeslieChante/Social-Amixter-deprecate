module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'devWebpro',
      password: process.env.DB_PASSWORD || 'amixte123',
      database: process.env.DB_NAME || 'social_network_db',
      port: process.env.DB_PORT || 5432, // Agrega el puerto en caso de que sea necesario
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST, // Configurado en el host de producción
      user: process.env.DB_USER, // Configurado en el host de producción
      password: process.env.DB_PASSWORD, // Configurado en el host de producción
      database: process.env.DB_NAME, // Configurado en el host de producción
      port: process.env.DB_PORT || 5432,
      ssl: { rejectUnauthorized: false } // Algunas plataformas requieren SSL en producción
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  }
};
