import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido (000.000.000-00)'),
  rg: z.string().min(5, 'RG inválido'),
  role: z.enum(['ADMIN', 'LIBRARIAN', 'PROFESSOR', 'STUDENT']),
  status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']),
  address: z.object({
    street: z.string().min(1, 'Rua obrigatória'),
    number: z.string().min(1, 'Número obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, 'Bairro obrigatório'),
    city: z.string().min(1, 'Cidade obrigatória'),
    state: z.string().length(2, 'Estado (UF) deve ter 2 letras'),
    zipCode: z.string().min(8, 'CEP inválido'),
  }),
});

export type UserFormData = z.infer<typeof userSchema>;
