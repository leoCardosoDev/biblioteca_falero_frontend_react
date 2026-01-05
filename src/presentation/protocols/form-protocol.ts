import { FieldValues, UseFormReturn, UseFormProps } from 'react-hook-form'
import { ZodType } from 'zod'

export interface FormProtocol<T extends FieldValues = FieldValues> {
  useForm: (props?: UseFormProps<T> & { schema?: ZodType }) => UseFormReturn<T>
}

export type { FieldValues, UseFormReturn, UseFormProps }
