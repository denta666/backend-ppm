import { z } from 'zod';

export const createContactSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  email: z
    .string()
    .email('Format email tidak valid'),
  message: z
    .string()
    .min(10, 'Pesan minimal 10 karakter')
    .max(1000, 'Pesan maksimal 1000 karakter'),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
