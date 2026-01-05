import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input, Select, TextArea, FormSection } from '@/presentation/react/components/ui';
import { ReservationFormData } from '../../reservation-schema';

export const ReservationDetails: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<ReservationFormData>();

  return (
    <FormSection title="Detalhes da Reserva">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          {...register('reservationDate')}
          id="reservationDate"
          label="Data da Reserva"
          type="date"
          error={errors.reservationDate?.message}
          required
        />

        <Select
          {...register('priority')}
          id="priority"
          label="Prioridade"
          error={errors.priority?.message}
          required
        >
          <option value="LOW">Baixa</option>
          <option value="MEDIUM">Média</option>
          <option value="HIGH">Alta</option>
        </Select>
      </div>

      <TextArea
        {...register('notes')}
        id="notes"
        label="Notas Adicionais"
        placeholder="Registre observações sobre a reserva..."
        error={errors.notes?.message}
      />
    </FormSection>
  );
};
