import React from 'react'
import { useFormContext } from '@/presentation/react/components/ui/form/context'
import { Input, FormSection } from '@/presentation/react/components/ui'
import { BookFormData } from '../../book-schema'

export const BookTechnicalInfo: React.FC = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<BookFormData>()

  return (
    <FormSection title="Dados Técnicos">
      <Input
        {...register('isbn')}
        id="isbn"
        label="ISBN"
        placeholder="000-0-00-000000-0"
        error={errors.isbn?.message}
        required
      />
      <Input
        {...register('year')}
        id="year"
        label="Ano"
        type="number"
        placeholder="2024"
        error={errors.year?.message}
        required
      />
      <Input
        {...register('edition')}
        id="edition"
        label="Edição"
        placeholder="1ª Ed."
        error={errors.edition?.message}
      />
    </FormSection>
  )
}
