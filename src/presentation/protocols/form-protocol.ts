import { FieldValues, UseFormReturn, UseFormProps } from 'react-hook-form'
import { ZodSchema } from 'zod'

export interface FormProtocol<T extends FieldValues = FieldValues> {
  useForm: (
    props?: UseFormProps<T> & { schema?: ZodSchema }
  ) => UseFormReturn<T>
}

export type { FieldValues, UseFormReturn, UseFormProps }
