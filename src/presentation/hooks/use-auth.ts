import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import type { Authentication } from '@/domain/usecases/authentication'

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export type LoginForm = z.infer<typeof loginSchema>

export const useAuth = (authentication: Authentication) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (params: LoginForm) => authentication.auth(params)
  })

  const onSubmit = async (data: LoginForm) => {
    await mutateAsync(data)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    onSubmit,
    errors,
    isLoading: isPending
  }
}
