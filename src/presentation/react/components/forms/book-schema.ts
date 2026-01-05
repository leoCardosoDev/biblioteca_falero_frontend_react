import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  subtitle: z.string().optional(),
  author: z.string().min(1, 'Autor é obrigatório'),
  publisher: z.string().min(1, 'Editora é obrigatória'),
  isbn: z.string().min(1, 'ISBN é obrigatório'),
  year: z.preprocess((val) => (val === '' ? undefined : Number(val)), z.number().int().min(1000).max(new Date().getFullYear() + 1)),
  edition: z.string().optional(),
  genre: z.string().optional(),
  language: z.string().min(1, 'Idioma é obrigatório'),
  pages: z.preprocess((val) => (val === '' ? undefined : Number(val)), z.number().int().min(1).optional()),
  quantity: z.preprocess((val) => (val === '' ? undefined : Number(val)), z.number().int().min(1, 'Quantidade deve ser pelo menos 1')),
  synopsis: z.string().optional(),
});

export type BookFormData = z.infer<typeof bookSchema>;
