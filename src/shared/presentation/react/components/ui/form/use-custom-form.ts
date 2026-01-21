import type { Validation } from '@/shared/presentation/protocols/validation'

import type {
  UseFormProps,
  FieldValues
} from '@/shared/presentation/protocols/form-protocol'
import { useReactHookFormAdapter } from '@/shared/infra/adapters/forms/react-hook-form-adapter'

export const useCustomForm = <T extends FieldValues>(
  props?: UseFormProps<T> & { validator?: Validation<T> }
) => {
  return useReactHookFormAdapter<T>(props)
}
