import { Validation } from '@/presentation/protocols/validation'
import { ZodValidatorAdapter } from '@/presentation/adapters/validation/zod-validator-adapter'
import { bookSchema } from '@/infra/validation/schemas/book-schema'
import { BookFormData } from '@/presentation/dtos/book-form-dto'

export const makeBookValidation = (): Validation<BookFormData> => {
  return new ZodValidatorAdapter<BookFormData>(bookSchema)
}
