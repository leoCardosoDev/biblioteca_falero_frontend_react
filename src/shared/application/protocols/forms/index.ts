import type { FieldValues, UseFormReturn, UseFormProps } from 'react-hook-form'
import type { Validation } from '../validation'

export interface FormProtocol<T extends FieldValues = FieldValues> {
  useForm: (
    props?: UseFormProps<T> & { validator?: Validation<T> }
  ) => UseFormReturn<T>
}

export type { FieldValues, UseFormReturn, UseFormProps }
