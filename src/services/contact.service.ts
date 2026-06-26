// src/services/contact.service.ts
import prisma from '../config/database';
import { CreateContactInput } from '../validations/contact.validation';

const ContactService = {
  async create(data: CreateContactInput) {
    return prisma.contact.create({ data });
  },

  async getAll() {
    return prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  async delete(id: string) {
    return prisma.contact.delete({ where: { id } });
  },

  async findById(id: string) {
    return prisma.contact.findUnique({ where: { id } });
  },
};

export { ContactService };