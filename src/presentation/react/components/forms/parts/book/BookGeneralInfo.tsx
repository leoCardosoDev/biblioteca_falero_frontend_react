import React from 'react'
import { useFormContext } from '@/presentation/react/components/ui/form/context'
import {
  Input,
  FormSection,
  TextArea
} from '@/presentation/react/components/ui'
import { BookFormData } from '../../book-schema'

export const BookGeneralInfo: React.FC = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<BookFormData>()

  return (
    <div className="flex flex-col gap-8">
      <FormSection title="Informações Básicas">
        <Input
          {...register('title')}
          id="title"
          label="Título da Obra"
          placeholder="Ex: Dom Casmurro"
          error={errors.title?.message}
          className="md:col-span-2"
          required
        />
        <Input
          {...register('subtitle')}
          id="subtitle"
          label="Subtítulo"
          placeholder="Ex: Edição Comemorativa"
          error={errors.subtitle?.message}
          className="md:col-span-2"
        />
        <Input
          {...register('author')}
          id="author"
          label="Autor(es)"
          placeholder="Ex: Machado de Assis"
          error={errors.author?.message}
          required
        />
        <Input
          {...register('publisher')}
          id="publisher"
          label="Editora"
          placeholder="Ex: Companhia das Letras"
          error={errors.publisher?.message}
          required
        />
      </FormSection>

      <TextArea
        {...register('synopsis')}
        label="Resumo / Sinopse"
        placeholder="Digite uma breve descrição sobre a obra..."
        error={errors.synopsis?.message}
      />
    </div>
  )
}
