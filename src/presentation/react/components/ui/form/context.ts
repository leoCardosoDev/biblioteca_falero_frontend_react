import { useFormContext as useRHFContext } from 'react-hook-form'

import type {
  FieldValues,
  UseFormReturn
} from '@/presentation/protocols/form-protocol'

export const useFormContext = <T extends FieldValues>(): UseFormReturn<T> => {
  return useRHFContext<T>()
}
