import { Request, Response, NextFunction } from 'express';
import { ContactService } from '../services/contact.service';
import { sendSuccess, sendError } from '../utils/responseFormatter';

export const ContactController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contact = await ContactService.create(req.body);
      sendSuccess(res, contact, 'Pesan berhasil dikirim', 201);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contacts = await ContactService.getAll();
      sendSuccess(res, contacts, 'Data kontak berhasil diambil');
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const existing = await ContactService.findById(id);
      if (!existing) {
        sendError(res, 'Data tidak ditemukan', 404);
        return;
      }
      await ContactService.delete(id);
      sendSuccess(res, null, 'Data berhasil dihapus');
    } catch (error) {
      next(error);
    }
  },
};
