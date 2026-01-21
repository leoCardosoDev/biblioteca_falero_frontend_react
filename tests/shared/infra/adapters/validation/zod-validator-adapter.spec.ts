import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { ZodValidatorAdapter } from '@/shared/infra/adapters/validation/zod-validator-adapter'

describe('ZodValidatorAdapter', () => {
  it('should return true if validation succeeds', () => {
    const schema = z.string()
    const sut = new ZodValidatorAdapter(schema)
    const result = sut.validate('valid_value')
    expect(result).toEqual({
      isValid: true,
      data: 'valid_value'
    })
  })

  it('should return false if validation fails', () => {
    const schema = z.string()
    const sut = new ZodValidatorAdapter(schema)
    const result = sut.validate(123)
    expect(result.isValid).toBe(false)
    expect(result.errors?.['']).toBeDefined()
  })

  it('should return nested errors correctly', () => {
    const schema = z.object({
      prop: z.string()
    })
    const sut = new ZodValidatorAdapter(schema)
    const result = sut.validate({ prop: 123 })
    expect(result.isValid).toBe(false)
    expect(result.errors?.['prop']).toBeDefined()
  })
})
