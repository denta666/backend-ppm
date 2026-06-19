import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { sendError } from '../utils/responseFormatter';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', err);

  if (err instanceof ZodError) {
    const messages = err.errors.map((e) => e.message).join(', ');
    sendError(res, messages, 400, 'Validation Error');
    return;
  }

  if (err.name === 'PrismaClientKnownRequestError') {
    sendError(res, 'Database error', 500, err.message);
    return;
  }

  sendError(res, err.message || 'Internal Server Error', 500);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  sendError(res, `Route ${req.originalUrl} tidak ditemukan`, 404);
};
