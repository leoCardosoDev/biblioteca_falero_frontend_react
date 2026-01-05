import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input, TextArea, FormSection } from '@/presentation/react/components/ui';
import { LoanFormData } from '../../loan-schema';

export const LoanTerms: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<LoanFormData>();

  return (
    <FormSection title="Prazos e Condições">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          {...register('loanDate')}
          id="loanDate"
          label="Data do Empréstimo"
          type="date"
          error={errors.loanDate?.message}
          required
        />
        <Input
          {...register('expectedReturnDate')}
          id="expectedReturnDate"
          label="Previsão de Devolução"
          type="date"
          error={errors.expectedReturnDate?.message}
          required
        />
      </div>

      <TextArea
        {...register('observations')}
        id="observations"
        label="Observações"
        placeholder="Registre as condições do livro na entrega..."
        error={errors.observations?.message}
      />
    </FormSection>
  );
};
