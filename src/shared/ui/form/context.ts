import { useFormContext as useRHFContext } from 'react-hook-form'

import type {
  FieldValues,
  UseFormReturn
} from '@/shared/application/protocols/forms'

export const useFormContext = <T extends FieldValues>(): UseFormReturn<T> => {
  return useRHFContext<T>()
}
