import { z } from 'zod';

export const loanSchema = z.object({
  userId: z.string().min(1, 'Selecione um leitor'),
  bookId: z.string().min(1, 'Selecione uma obra ou exemplares'),
  loanDate: z.string().min(1, 'Data de empréstimo é obrigatória'),
  expectedReturnDate: z.string().min(1, 'Data de devolução prevista é obrigatória'),
  observations: z.string().optional(),
});

export type LoanFormData = z.infer<typeof loanSchema>;
