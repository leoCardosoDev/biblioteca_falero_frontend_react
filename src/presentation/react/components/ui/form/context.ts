import { useFormContext as useRHFContext } from 'react-hook-form'

import {
  FieldValues,
  UseFormReturn
} from '@/presentation/protocols/form-protocol'

export const useFormContext = <T extends FieldValues>(): UseFormReturn<T> => {
  return useRHFContext<T>()
}
