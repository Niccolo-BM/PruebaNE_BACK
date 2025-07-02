const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('./config');
const databaseManager = require('./config/database');

const errorHandler = require('./shared/middleware/errorHandler');

const noteRoutes = require('./domains/note/routes/noteRoutes');
const setupMiddleware = (app) => {
  app.use(helmet());
  
  app.use(cors());
  
  if (config.server.nodeEnv !== 'test') {
    app.use(morgan('combined'));
  }
  
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  
  return app;
};

const setupRoutes = (app) => {
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: config.server.nodeEnv,
    });
  });

  app.use('/api/v1/notes', noteRoutes);

  app.get('/', (req, res) => {
    res.json({
      message: 'PruebaNE API is running',
      version: '1.0.0',
      environment: config.server.nodeEnv,
      timestamp: new Date().toISOString(),
    });
  });

  return app;
};

const setupErrorHandling = (app) => {
  app.use(errorHandler);
  return app;
};

const initializeDatabases = async () => {
  try {
    await databaseManager.connectMongoDB();
    
    console.log('✅ All databases initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

const setupGracefulShutdown = (server) => {
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
      databaseManager.disconnect();
      process.exit(0);
    });
  });
  
  process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
      databaseManager.disconnect();
      process.exit(0);
    });
  });
};

const createApp = () => {
  const app = express();
  
  return [setupMiddleware, setupRoutes, setupErrorHandling]
    .reduce((app, setupFn) => setupFn(app), app);
};

const startServer = async () => {
  try {
    await initializeDatabases();
    
    const app = createApp();
    
    const server = app.listen(config.server.port, () => {
      console.log(`🚀 Server running on port ${config.server.port}`);
      console.log(`📝 Environment: ${config.server.nodeEnv}`);
      console.log(`🔗 Health check: http://localhost:${config.server.port}/health`);
    });

    setupGracefulShutdown(server);

    return { app, server };
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

module.exports = {
  createApp,
  startServer,
  setupMiddleware,
  setupRoutes,
  setupErrorHandling,
  initializeDatabases,
};
