import React from 'react'
import { useFormContext } from '@/shared/presentation/react/components/ui/form/context'
import { Input, FormSection } from '@/shared/presentation/react/components/ui'
import type { BookFormData } from '@/shared/presentation/dtos/book-form-dto'

export function BookTechnicalInfo() {
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
