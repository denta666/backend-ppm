import prisma from '../config/database';
import { CreateReviewInput } from '../validations/review.validation';

export const ReviewService = {
  async create(data: CreateReviewInput) {
    return prisma.review.create({ data });
  },

  async getAll() {
    return prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  async delete(id: string) {
    return prisma.review.delete({ where: { id } });
  },

  async findById(id: string) {
    return prisma.review.findUnique({ where: { id } });
  },
};

export default ReviewService;
