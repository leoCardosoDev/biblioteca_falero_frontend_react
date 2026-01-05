import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FieldValues,
  Resolver
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodSchema } from 'zod'

// import { FormProtocol } from '@/presentation/protocols/form-protocol'

export const useReactHookFormAdapter = <T extends FieldValues>(
  props?: UseFormProps<T> & { schema?: ZodSchema }
): UseFormReturn<T> => {
  const { schema, ...rest } = props || {}
  return useForm<T>({
    ...rest,
    resolver: schema
      ? (zodResolver(schema) as unknown as Resolver<T>)
      : undefined
  })
}
