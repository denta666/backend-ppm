import { Request, Response, NextFunction } from 'express';
import { MenuService } from '../services/menu.service';
import { sendSuccess, sendError } from '../utils/responseFormatter';

export const MenuController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const menu = await MenuService.create(req.body);
      sendSuccess(res, menu, 'Menu berhasil ditambahkan', 201);
    } catch (error) {
      next(error);
    }
  },


  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const menus = await MenuService.getAll();
      sendSuccess(res, menus, 'Data menu berhasil diambil');
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const existing = await MenuService.findById(id);
      if (!existing) {
        sendError(res, 'Menu tidak ditemukan', 404);
        return;
      }
      const menu = await MenuService.update(id, req.body);
      sendSuccess(res, menu, 'Menu berhasil diperbarui');
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const existing = await MenuService.findById(id);
      if (!existing) {
        sendError(res, 'Menu tidak ditemukan', 404);
        return;
      }
      await MenuService.delete(id);
      sendSuccess(res, null, 'Menu berhasil dihapus');
    } catch (error) {
      next(error);
    }
  },
};
