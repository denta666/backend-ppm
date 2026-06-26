import { Request, Response, NextFunction } from 'express';
import { GalleryService } from '../services/gallery.service';
import { sendSuccess, sendError } from '../utils/responseFormatter';

export const GalleryController = {
  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const galleries = await GalleryService.getAll();
      sendSuccess(res, galleries, 'Data galeri berhasil diambil');
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const gallery = await GalleryService.create(req.body);
      sendSuccess(res, gallery, 'Foto berhasil ditambahkan', 201);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const existing = await GalleryService.findById(id);
      if (!existing) {
        sendError(res, 'Data tidak ditemukan', 404);
        return;
      }
      await GalleryService.delete(id);
      sendSuccess(res, null, 'Foto berhasil dihapus');
    } catch (error) {
      next(error);
    }
  },
};