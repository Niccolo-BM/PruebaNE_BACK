const dotenv = require('dotenv');

dotenv.config();

const defaultLocalMongo = 'mongodb://localhost:27017/pruebane_db';
const defaultDockerMongo = 'mongodb://admin:adminpassword@mongodb:27017/prueba_mongo_db';

const mongoUri = process.env.NODE_ENV === 'development'
  ? (process.env.MONGODB_URI_LOCAL || defaultLocalMongo)
  : (process.env.MONGODB_URI || defaultDockerMongo);

const config = {
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  
  databases: {
    mongodb: {
      uri: mongoUri,
    },
    mysql: {
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'pruebane_mysql',
    },
  },
  
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

module.exports = config;
