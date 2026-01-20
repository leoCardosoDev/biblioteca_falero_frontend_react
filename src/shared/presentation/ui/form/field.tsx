import React from 'react'
import { useFormContext } from './context'
import { Input } from '../input'

interface FieldProps extends React.ComponentProps<typeof Input> {
  name: string
}

export function Field({ name, ...props }: FieldProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const error = errors[name]?.message as string | undefined

  return (
    <Input
      id={name}
      {...register(name)}
      {...props}
      error={error || props.error}
    />
  )
}
