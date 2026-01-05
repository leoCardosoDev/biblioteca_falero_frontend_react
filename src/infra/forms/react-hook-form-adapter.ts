import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FieldValues,
  Resolver
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodType } from 'zod'

export const useReactHookFormAdapter = <T extends FieldValues>(
  props?: UseFormProps<T> & { schema?: ZodType }
): UseFormReturn<T> => {
  const { schema, ...rest } = props || {}
  return useForm<T>({
    ...rest,
    resolver: schema
      ? (zodResolver(schema) as unknown as Resolver<T>)
      : undefined
  })
}
