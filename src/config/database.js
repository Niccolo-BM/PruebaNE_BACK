const { MongoClient } = require('mongodb');
const mysql = require('mysql2/promise');
const config = require('./index');

const createDatabaseConnections = () => {
  let mongoClient = null;
  let mysqlConnection = null;

  const connectMongoDB = async () => {
    try {
      mongoClient = new MongoClient(config.databases.mongodb.uri);
      await mongoClient.connect();
      console.log('✅ MongoDB connected successfully');
      return mongoClient.db();
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  };

  const connectMySQL = async () => {
    try {
      mysqlConnection = await mysql.createConnection(config.databases.mysql);
      console.log('✅ MySQL connected successfully');
      return mysqlConnection;
    } catch (error) {
      console.error('❌ MySQL connection error:', error);
      throw error;
    }
  };

  const disconnect = async () => {
    try {
      if (mongoClient) {
        await mongoClient.close();
        console.log('MongoDB disconnected');
        mongoClient = null;
      }
      
      if (mysqlConnection) {
        await mysqlConnection.end();
        console.log('MySQL disconnected');
        mysqlConnection = null;
      }
    } catch (error) {
      console.error('Error disconnecting databases:', error);
    }
  };

  const getMongoClient = () => mongoClient;
  const getMySQLConnection = () => mysqlConnection;

  return {
    connectMongoDB,
    connectMySQL,
    disconnect,
    getMongoClient,
    getMySQLConnection,
  };
};

module.exports = createDatabaseConnections();
