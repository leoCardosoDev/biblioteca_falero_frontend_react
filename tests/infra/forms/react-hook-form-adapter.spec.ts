import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { z } from 'zod'

import { useReactHookFormAdapter } from '@/infra/forms/react-hook-form-adapter'

describe('ReactHookFormAdapter', () => {
  it('should return form methods', () => {
    const { result } = renderHook(() => useReactHookFormAdapter())

    expect(result.current.register).toBeDefined()
    expect(result.current.handleSubmit).toBeDefined()
    expect(result.current.formState).toBeDefined()
  })

  it('should use zod resolver when schema is provided', () => {
    const schema = z.object({
      name: z.string().min(1)
    })

    const { result } = renderHook(() =>
      useReactHookFormAdapter({
        schema,
        defaultValues: { name: '' }
      })
    )

    expect(result.current.formState.errors).toEqual({})
  })

  it('should handle default values', () => {
    const defaultValues = { name: 'John Doe' }
    const { result } = renderHook(() =>
      useReactHookFormAdapter({ defaultValues })
    )

    expect(result.current.getValues()).toEqual(defaultValues)
  })
})
