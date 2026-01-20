import type { Validation } from '@/shared/presentation/protocols/validation'
import { ZodValidatorAdapter } from '@/shared/presentation/adapters/validation/zod-validator-adapter'
import { loanSchema } from '@/shared/infra/validation/schemas/loan-schema'
import type { LoanFormData } from '@/shared/presentation/dtos/loan-form-dto'

export const makeLoanValidation = (): Validation<LoanFormData> => {
  return new ZodValidatorAdapter<LoanFormData>(loanSchema)
}
