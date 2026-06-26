import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { sendSuccess, sendError } from '../utils/responseFormatter';

export const AuthController = {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.login(req.body);
      sendSuccess(res, result, 'Login berhasil');
    } catch (error) {
      if (error instanceof Error) {
        sendError(res, error.message, 401);
        return;
      }
      next(error);
    }
  },

  async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      sendSuccess(res, (req as any).admin, 'Data admin');
    } catch (error) {
      next(error);
    }
  },
};
