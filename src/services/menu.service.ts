import prisma from '../config/database';
import { CreateMenuInput, UpdateMenuInput } from '../validations/menu.validation';

export const MenuService = {
  async create(data: CreateMenuInput) {
    return prisma.menu.create({ data });
  },

  async getAll() {
    return prisma.menu.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.menu.findUnique({ where: { id } });
  },

  async update(id: string, data: UpdateMenuInput) {
    return prisma.menu.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.menu.delete({ where: { id } });
  },
};