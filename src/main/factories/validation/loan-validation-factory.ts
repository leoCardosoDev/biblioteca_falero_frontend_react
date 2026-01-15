import type { Validation } from '@/presentation/protocols/validation'
import { ZodValidatorAdapter } from '@/presentation/adapters/validation/zod-validator-adapter'
import { loanSchema } from '@/infra/validation/schemas/loan-schema'
import type { LoanFormData } from '@/presentation/dtos/loan-form-dto'

export const makeLoanValidation = (): Validation<LoanFormData> => {
  return new ZodValidatorAdapter<LoanFormData>(loanSchema)
}
