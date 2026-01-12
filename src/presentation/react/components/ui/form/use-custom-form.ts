import { Validation } from '@/presentation/protocols/validation'

import {
  UseFormProps,
  FieldValues
} from '@/presentation/protocols/form-protocol'
import { useReactHookFormAdapter } from '@/presentation/adapters/forms/react-hook-form-adapter'

export const useCustomForm = <T extends FieldValues>(
  props?: UseFormProps<T> & { validator?: Validation<T> }
) => {
  return useReactHookFormAdapter<T>(props)
}
