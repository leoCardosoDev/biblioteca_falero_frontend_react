import type { Validation } from '@/presentation/protocols/validation'
import { ZodValidatorAdapter } from '@/presentation/adapters/validation/zod-validator-adapter'
import { userSchema } from '@/infra/validation/schemas/user-schema'
import type { UserFormData } from '@/presentation/dtos/user-form-dto'

export const makeUserValidation = (): Validation<UserFormData> => {
  return new ZodValidatorAdapter<UserFormData>(userSchema)
}
