import type { Validation } from '@/shared/presentation/protocols/validation'
import { ZodValidatorAdapter } from '@/shared/presentation/adapters/validation/zod-validator-adapter'
import { userSchema } from '@/shared/infra/validation/schemas/user-schema'
import type { UserFormData } from '@/shared/presentation/dtos/user-form-dto'

export const makeUserValidation = (): Validation<UserFormData> => {
  return new ZodValidatorAdapter<UserFormData>(userSchema)
}
