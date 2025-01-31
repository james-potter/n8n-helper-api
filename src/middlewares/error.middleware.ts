import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';

class HttpException extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}

class ReadabilityException extends Error {
  constructor(public message: string) {
    super(message);
  }
}

const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';

  logger.error(`${status} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(status).json({
    success: false,
    status,
    message
  });
};

export { HttpException, ReadabilityException, errorHandler };