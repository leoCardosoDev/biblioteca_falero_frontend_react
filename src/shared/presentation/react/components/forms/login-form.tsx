import { Button, Icon } from '@/shared/presentation/ui'
import { Field, useCustomForm, Form } from '@/shared/presentation/ui/form'
import { LoginHeader } from '@/shared/presentation/react/components/login-header'
import type { LoginFormData } from '@/shared/presentation/dtos/login-form-dto'
import { ZodValidatorAdapter } from '@/shared/presentation/adapters/validation/zod-validator-adapter'
import { loginSchema } from '@/shared/infra/validation/schemas/login-schema'

export type { LoginFormData }

interface LoginFormProps {
  isLoading: boolean
  error?: string
  onSubmit: (data: LoginFormData) => void
}

export function LoginForm({ isLoading, error, onSubmit }: LoginFormProps) {
  const methods = useCustomForm<LoginFormData>({
    validator: new ZodValidatorAdapter(loginSchema),
    mode: 'onChange'
  })

  const {
    formState: { isValid }
  } = methods

  return (
    <div className="w-full">
      <LoginHeader />
      <Form
        form={methods}
        onSubmit={onSubmit}
        className="flex flex-col gap-6"
        noValidate
      >
        <Field
          name="email"
          label="Usuário"
          placeholder="Digite seu login"
          icon="person"
          required
        />
        <Field
          name="password"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          icon="lock"
          required
        />

        {error && (
          <div className="rounded bg-red-100 p-2 text-center text-sm text-red-500 dark:bg-red-900/20">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="mt-2 h-12 bg-primary text-white hover:bg-blue-700"
          disabled={isLoading || !isValid}
        >
          {!isLoading && <Icon name="arrow_forward" className="mr-2 h-5 w-5" />}
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
      </Form>
    </div>
  )
}
