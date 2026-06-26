import { z } from 'zod';

export const createMenuSchema = z.object({
  name: z.string().min(2, 'Nama menu minimal 2 karakter').max(100),
  category: z.enum(['kopi', 'non-kopi', 'makanan', 'snack'], {
    errorMap: () => ({ message: 'Kategori tidak valid' }),
  }),
  price: z.number().int().min(0, 'Harga tidak boleh negatif'),
  description: z.string().min(5, 'Deskripsi minimal 5 karakter').max(500),
  image: z.string().url('URL gambar tidak valid'),
  isFavorite: z.boolean().optional().default(false),
});

export const updateMenuSchema = createMenuSchema.partial();

export type CreateMenuInput = z.infer<typeof createMenuSchema>;
export type UpdateMenuInput = z.infer<typeof updateMenuSchema>;
