import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input, Select, FormSection } from '@/presentation/react/components/ui';
import { BookFormData } from '../../book-schema';

export const BookCategorization: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<BookFormData>();

  return (
    <FormSection title="Categorização">
      <Select
        {...register('genre')}
        id="genre"
        label="Gênero"
        error={errors.genre?.message}
      >
        <option value="">Selecione</option>
        <option>Romance</option>
        <option>Ficção Científica</option>
        <option>Fantasia</option>
        <option>Técnico</option>
      </Select>
      <Select
        {...register('language')}
        id="language"
        label="Idioma"
        error={errors.language?.message}
        required
      >
        <option>Português</option>
        <option>Inglês</option>
        <option>Espanhol</option>
      </Select>
      <Input
        {...register('pages')}
        id="pages"
        label="Nº Páginas"
        type="number"
        placeholder="0"
        error={errors.pages?.message}
      />
      <Input
        {...register('quantity')}
        id="quantity"
        label="Quantidade"
        type="number"
        placeholder="1"
        error={errors.quantity?.message}
        required
      />
    </FormSection>
  );
};
