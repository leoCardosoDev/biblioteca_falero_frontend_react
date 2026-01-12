import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FieldValues,
  Resolver
} from 'react-hook-form'
import { Validation } from '@/presentation/protocols/validation'

const set = (obj: Record<string, unknown>, path: string, value: unknown) => {
  const parts = path.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: Record<string, any> = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    if (!current[part]) current[part] = {}
    current = current[part]
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
