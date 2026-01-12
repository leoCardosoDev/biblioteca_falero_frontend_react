import { ZodType } from 'zod'
import {
  Validation,
  ValidationResult
} from '@/presentation/protocols/validation'

export class ZodValidatorAdapter<T = unknown> implements Validation<T> {
  constructor(private readonly schema: ZodType) {}

  validate(input: unknown): ValidationResult<T> {
    const result = this.schema.safeParse(input)
    if (result.success) {
      return {
        isValid: true,
        data: result.data as T
      }
    }

    const errors: Record<string, string> = {}
    result.error.issues.forEach((observable) => {
      errors[observable.path.join('.')] = observable.message
    })

    return {
      isValid: false,
      errors
    }
  }
}
