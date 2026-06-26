import { Request, Response, NextFunction } from 'express';
import { ReviewService } from '../services/review.service';
import { sendSuccess, sendError } from '../utils/responseFormatter';

export const ReviewController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const review = await ReviewService.create(req.body);
      sendSuccess(res, review, 'Testimoni berhasil ditambahkan', 201);
    } catch (error) {
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const reviews = await ReviewService.getAll(); // ← ganti findAll() jadi getAll()
    sendSuccess(res, reviews, 'Data testimoni berhasil diambil');
  } catch (error) {
    next(error);
  }
},
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const existing = await ReviewService.findById(id);
      if (!existing) {
        sendError(res, 'Data tidak ditemukan', 404);
        return;
      }
      await ReviewService.delete(id);
      sendSuccess(res, null, 'Testimoni berhasil dihapus');
    } catch (error) {
      next(error);
    }
  },
};
