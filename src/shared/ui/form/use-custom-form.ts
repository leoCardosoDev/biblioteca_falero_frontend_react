import type { Validation } from '@/shared/application/protocols/validation'

import type {
  UseFormProps,
  FieldValues
} from '@/shared/application/protocols/forms'
import { useReactHookFormAdapter } from '@/shared/infra/adapters/forms/react-hook-form-adapter'

export const useCustomForm = <T extends FieldValues>(
  props?: UseFormProps<T> & { validator?: Validation<T> }
) => {
  return useReactHookFormAdapter<T>(props)
}
