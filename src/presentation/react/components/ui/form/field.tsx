import React from 'react'
import { useFormContext } from '@/presentation/react/components/ui/form/context'
import { Input } from '@/presentation/react/components/ui'

interface FieldProps extends React.ComponentProps<typeof Input> {
  name: string
}

export const Field: React.FC<FieldProps> = ({ name, ...props }) => {
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
