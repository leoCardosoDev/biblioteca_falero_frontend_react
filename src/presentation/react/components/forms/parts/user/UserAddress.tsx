import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input, FormSection } from '@/presentation/react/components/ui';
import { maskZipCode } from '@/presentation/react/helpers/mask-utils';
import { UserFormData } from '../../user-schema';

export const UserAddress: React.FC = () => {
  const { register, setValue, watch, formState: { errors } } = useFormContext<UserFormData>();

  const watchedZipCode = watch('address.zipCode');

  return (
    <FormSection title="Endereço">
      <Input
        {...register('address.zipCode')}
        id="zipCode"
        label="CEP"
        value={watchedZipCode || ''}
        placeholder="00000-000"
        onChange={(e) => {
          setValue('address.zipCode', maskZipCode(e.target.value), { shouldValidate: true });
        }}
        error={errors.address?.zipCode?.message}
        required
      />

      <div className="hidden md:block" />

      <Input
        {...register('address.street')}
        id="street"
        label="Rua"
        error={errors.address?.street?.message}
        className="md:col-span-2"
        required
      />

      <Input
        {...register('address.number')}
        id="number"
        label="Número"
        error={errors.address?.number?.message}
        required
      />

      <Input
        {...register('address.neighborhood')}
        id="neighborhood"
        label="Bairro"
        error={errors.address?.neighborhood?.message}
        required
      />

      <Input
        {...register('address.city')}
        id="city"
        label="Cidade"
        error={errors.address?.city?.message}
        required
      />

      <Input
        {...register('address.state')}
        id="state"
        label="Estado (UF)"
        maxLength={2}
        error={errors.address?.state?.message}
        required
      />
    </FormSection>
  );
};
