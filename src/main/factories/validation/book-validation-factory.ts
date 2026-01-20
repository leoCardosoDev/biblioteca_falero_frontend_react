import type { Validation } from '@/shared/presentation/protocols/validation'
import { ZodValidatorAdapter } from '@/shared/presentation/adapters/validation/zod-validator-adapter'
import { bookSchema } from '@/shared/infra/validation/schemas/book-schema'
import type { BookFormData } from '@/shared/presentation/dtos/book-form-dto'

export const makeBookValidation = (): Validation<BookFormData> => {
  return new ZodValidatorAdapter<BookFormData>(bookSchema)
}
