import { Validation } from '@/presentation/protocols/validation'
import { ZodValidatorAdapter } from '@/presentation/adapters/validation/zod-validator-adapter'
import { loginSchema } from '@/infra/validation/schemas/login-schema'
import { LoginFormData } from '@/presentation/dtos/login-form-dto'

export const makeLoginValidation = (): Validation<LoginFormData> => {
  return new ZodValidatorAdapter<LoginFormData>(loginSchema)
}
