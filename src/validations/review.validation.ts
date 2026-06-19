import { z } from 'zod';

export const createReviewSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  rating: z
    .number()
    .int('Rating harus bilangan bulat')
    .min(1, 'Rating minimal 1')
    .max(5, 'Rating maksimal 5'),
  comment: z
    .string()
    .min(5, 'Komentar minimal 5 karakter')
    .max(500, 'Komentar maksimal 500 karakter'),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
