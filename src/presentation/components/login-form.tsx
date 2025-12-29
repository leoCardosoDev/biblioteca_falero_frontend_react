import React from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/presentation/components/UI/Input';
import { Button } from '@/presentation/components/UI/Components';
import type { LoginFormData } from '../hooks/use-auth';

type LoginFormProps = {
  register: UseFormRegister<LoginFormData>
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  errors: FieldErrors<LoginFormData>
  isLoading: boolean
  error?: string
}

export const LoginForm: React.FC<LoginFormProps> = ({ register, handleSubmit, errors, isLoading, error }) => {
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <Input
        label="Usuário"
        placeholder="Digite seu login"
        icon="person"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        icon="lock"
        {...register('password')}
        error={errors.password?.message}
      />

      {error && <div className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/20 p-2 rounded">{error}</div>}

      <Button className="h-12 mt-2" icon={isLoading ? undefined : "arrow_forward"} disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  )
}
