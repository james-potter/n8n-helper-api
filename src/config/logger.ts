import winston from 'winston';
import config from './env';

const { format } = winston;
const { combine, timestamp, json } = format;

const logger = winston.createLogger({
  level: config.logLevel,
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export default logger;