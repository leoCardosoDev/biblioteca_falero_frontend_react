// @vitest-environment jsdom
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import type { Validation } from '@/shared/presentation/protocols/validation'

import { useReactHookFormAdapter } from '@/shared/infra/adapters/forms/react-hook-form-adapter'
import { ZodValidatorAdapter } from '@/shared/infra/adapters/validation/zod-validator-adapter'

describe('ReactHookFormAdapter', () => {
  it('should return form methods', () => {
    const { result } = renderHook(() => useReactHookFormAdapter())

    expect(result.current.register).toBeDefined()
    expect(result.current.handleSubmit).toBeDefined()
    expect(result.current.formState).toBeDefined()
  })

  it('should use validator when provided', async () => {
    const schema = z.object({
      name: z.string().min(1)
    })
    const validator = new ZodValidatorAdapter<{ name: string }>(schema)

    const { result } = renderHook(() => {
      const methods = useReactHookFormAdapter({
        validator,
        defaultValues: { name: '' }
      })

      expect(methods.formState.errors).toBeDefined()
      return methods
    })

    let validationResult: boolean
    await act(async () => {
      validationResult = await result.current.trigger()
    })

    expect(validationResult!).toBe(false)
    expect(result.current.formState.isValid).toBe(false)
    expect(result.current.formState.errors.name).toBeDefined()
  })

  it('should handle validation success', async () => {
    const schema = z.object({
      name: z.string().min(1)
    })
    const validator = new ZodValidatorAdapter<{ name: string }>(schema)

    const { result } = renderHook(() =>
      useReactHookFormAdapter({
        validator,
        defaultValues: { name: 'Valid Name' }
      })
    )

    await result.current.trigger()
    expect(result.current.formState.errors).toEqual({})
  })

  it('should handle default values', () => {
    const defaultValues = { name: 'John Doe' }
    const { result } = renderHook(() =>
      useReactHookFormAdapter({ defaultValues })
    )

    expect(result.current.getValues()).toEqual(defaultValues)
  })

  it('should handle multiple nested validation errors', async () => {
    const schema = z.object({
      address: z.object({
        city: z.string().min(1),
        state: z.string().min(1)
      })
    })
    const validator = new ZodValidatorAdapter<{
      address: { city: string; state: string }
    }>(schema)

    const { result } = renderHook(() => {
      const methods = useReactHookFormAdapter({
        validator,
        defaultValues: {
          address: {
            city: '',
            state: ''
          }
        }
      })
      methods.register('address.city')
      methods.register('address.state')

      expect(methods.formState.errors).toBeDefined()
      return methods
    })

    await act(async () => {
      await result.current.trigger()
    })

    expect(result.current.formState.errors.address).toBeDefined()
    expect(result.current.formState.errors.address?.city).toBeDefined()
    expect(result.current.formState.errors.address?.state).toBeDefined()
  })

  it('should fallback to values if validator returns no data', async () => {
    const validator: Validation<Record<string, unknown>> = {
      validate: () => ({ isValid: true, data: undefined })
    }

    const { result } = renderHook(() =>
      useReactHookFormAdapter({
        validator,
        defaultValues: { name: 'test' }
      })
    )

    await act(async () => {
      await result.current.trigger()
    })

    expect(result.current.formState.errors).toEqual({})
  })

  it('should handle invalid result with no errors', async () => {
    const validator: Validation<Record<string, unknown>> = {
      validate: () => ({ isValid: false })
    }

    const { result } = renderHook(() => {
      const methods = useReactHookFormAdapter({
        validator,
        defaultValues: { name: 'test' }
      })
      expect(methods.formState.errors).toBeDefined()
      return methods
    })

    await act(async () => {
      await result.current.trigger()
    })

    expect(result.current.formState.isValid).toBe(true)
    expect(result.current.formState.errors).toEqual({})
  })
})
