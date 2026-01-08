import React from 'react'
import { useFormContext } from '@/presentation/react/components/ui/form'
import { Select, FormSection } from '@/presentation/react/components/ui'
import { UserFormData } from '../../user-schema'

export const UserAccessControl: React.FC = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<UserFormData>()

  return (
    <FormSection title="Controle de Acesso">
      <Select
        {...register('status')}
        id="status"
        label="Status"
        error={errors.status?.message}
        required
      >
        <option value="ACTIVE">Ativo</option>
        <option value="INACTIVE">Inativo</option>
        <option value="BLOCKED">Bloqueado</option>
      </Select>
    </FormSection>
  )
}
