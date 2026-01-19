import {
  useForm,
  type UseFormProps,
  type UseFormReturn,
  type FieldValues,
  type Resolver
} from 'react-hook-form'
import type { Validation } from '@/shared/application/protocols/validation'

const set = (obj: Record<string, unknown>, path: string, value: unknown) => {
  const parts = path.split('.')
  let current: Record<string, unknown> = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    if (!current[part]) current[part] = {}
    current = current[part] as Record<string, unknown>
  }
  current[parts[parts.length - 1]] = value
}

export const useReactHookFormAdapter = <T extends FieldValues>(
  props?: UseFormProps<T> & { validator?: Validation<T> }
): UseFormReturn<T> => {
  const { validator, ...rest } = props || {}

  const resolver: Resolver<T> | undefined = validator
    ? async (values) => {
        const result = validator.validate(values)
        if (result.isValid) {
          return {
            values: result.data || values,
            errors: {}
          }
        }

        const errors = {}
        if (result.errors) {
          Object.entries(result.errors).forEach(([key, message]) => {
            set(errors, key, {
              type: 'validation',
              message: String(message)
            })
          })
        }

        return {
          values: {},
          errors
        }
      }
    : undefined

  return useForm<T>({
    ...rest,
    resolver
  })
}
