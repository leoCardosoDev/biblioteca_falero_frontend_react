import type { Validation } from '@/shared/presentation/protocols/validation'
import { ZodValidatorAdapter } from '@/shared/presentation/adapters/validation/zod-validator-adapter'
import { loginSchema } from '@/shared/infra/validation/schemas/login-schema'
import type { LoginFormData } from '@/shared/presentation/dtos/login-form-dto'

export const makeLoginValidation = (): Validation<LoginFormData> => {
  return new ZodValidatorAdapter<LoginFormData>(loginSchema)
}
