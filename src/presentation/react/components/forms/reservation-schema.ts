import { z } from 'zod';

export const reservationSchema = z.object({
  userId: z.string().min(1, 'Selecione um usuário'),
  bookId: z.string().min(1, 'Selecione uma obra ou exemplares'),
  reservationDate: z.string().min(1, 'Data da reserva é obrigatória'),
  priority: z.string().min(1, 'Selecione a prioridade'),
  notes: z.string().optional(),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;
