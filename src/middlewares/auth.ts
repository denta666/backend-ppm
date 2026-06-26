import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { sendError } from '../utils/responseFormatter';

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    sendError(res, 'Token tidak ditemukan', 401);
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = AuthService.verifyToken(token);
    (req as any).admin = decoded;
    next();
  } catch {
    sendError(res, 'Token tidak valid atau sudah kedaluwarsa', 401);
  }
};
