import React from 'react'
import { FormProvider } from 'react-hook-form'

import {
  UseFormReturn,
  FieldValues
} from '@/presentation/protocols/form-protocol'

interface FormProps<T extends FieldValues> extends Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> {
  form: UseFormReturn<T>
  onSubmit: (data: T) => void
  children: React.ReactNode
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={className}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  )
}
