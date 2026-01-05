import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input, Select, FormSection } from '@/presentation/react/components/ui';
import { ReservationFormData } from '../../reservation-schema';

export const ReservationParticipants: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<ReservationFormData>();

  return (
    <FormSection title="Participantes">
      <Select
        {...register('userId')}
        id="userId"
        label="Usuário"
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
  );
};
