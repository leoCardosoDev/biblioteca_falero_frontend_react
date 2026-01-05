import { ZodSchema } from 'zod'

import {
  UseFormProps,
  FieldValues
} from '@/presentation/protocols/form-protocol'
import { useReactHookFormAdapter } from '@/infra/forms/react-hook-form-adapter'

export const useCustomForm = <T extends FieldValues>(
  props?: UseFormProps<T> & { schema?: ZodSchema }
) => {
  return useReactHookFormAdapter<T>(props)
}
