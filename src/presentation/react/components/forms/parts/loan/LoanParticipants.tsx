import React from 'react'
import { useFormContext } from '@/presentation/react/components/ui/form/context'
import { Input, Select, FormSection } from '@/presentation/react/components/ui'
import { LoanFormData } from '../../loan-schema'

export const LoanParticipants: React.FC = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<LoanFormData>()

  return (
    <FormSection title="Participantes">
      <Select
        {...register('userId')}
        id="userId"
        label="Leitor / Usuário"
        error={errors.userId?.message}
        required
      >
        <option value="">Selecione...</option>
        <option value="1">John Doe</option>
        <option value="2">Jane Smith</option>
      </Select>

      <Input
        {...register('bookId')}
        id="bookId"
        label="Obra / Exemplar"
        placeholder="Busque pelo título ou ISBN..."
        error={errors.bookId?.message}
        required
      />
    </FormSection>
  )
}
