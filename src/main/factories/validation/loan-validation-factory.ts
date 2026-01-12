import { Validation } from '@/presentation/protocols/validation'
import { ZodValidatorAdapter } from '@/infra/validation/zod-validator-adapter'
import { loanSchema } from '@/infra/validation/schemas/loan-schema'
import { LoanFormData } from '@/presentation/dtos/loan-form-dto'

export const makeLoanValidation = (): Validation<LoanFormData> => {
  return new ZodValidatorAdapter<LoanFormData>(loanSchema)
}
