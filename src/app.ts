import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import config from './config/env';
import logger from './config/logger';
import specs from './utils/swagger';
import v1Routes from './routes/v1';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// Middleware
app.use(express.json());

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/v1', v1Routes);

// Error handling
app.use(errorHandler);

// Server
const startServer = () => {
  app.listen(config.port, () => {
    logger.info(`Server running in ${config.env} mode on port ${config.port}`);
  });
};

export { app, startServer };