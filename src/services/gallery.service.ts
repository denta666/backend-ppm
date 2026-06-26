import prisma from '../config/database';

export const GalleryService = {
  async getAll() {
    return prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  async create(data: { title: string; category: string; image: string }) {
    return prisma.gallery.create({ data });
  },

  async delete(id: string) {
    return prisma.gallery.delete({ where: { id } });
  },

  async findById(id: string) {
    return prisma.gallery.findUnique({ where: { id } });
  },
};