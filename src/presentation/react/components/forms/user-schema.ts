import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.email({ message: 'Email inválido' }),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido (000.000.000-00)'),
  rg: z.string().min(5, 'RG inválido'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  phone: z.string().optional(),
  role: z.enum(['ADMIN', 'LIBRARIAN', 'PROFESSOR', 'STUDENT']),
  status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']),
  address: z.object({
    street: z.string().min(1, 'Rua obrigatória'),
    number: z.string().min(1, 'Número obrigatório'),
    complement: z.string().optional(),
    neighborhoodId: z.string().min(1, 'Bairro obrigatório'),
    cityId: z.string().min(1, 'Cidade obrigatória'),
    state: z.string().length(2, 'Estado (UF) deve ter 2 letras'),
    zipCode: z
      .string()
      .min(8, 'CEP inválido')
      .transform((val) => val.replace(/\D/g, ''))
  })
})

export type UserFormData = z.infer<typeof userSchema>
