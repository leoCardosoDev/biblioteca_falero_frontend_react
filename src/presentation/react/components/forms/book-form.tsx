import React, { useEffect } from 'react'
import { Icon } from '@/presentation/react/components/ui'
import { bookSchema, BookFormData } from './book-schema'
import { BookCoverUpload } from './parts/book/BookCoverUpload'
import { BookGeneralInfo } from './parts/book/BookGeneralInfo'
import { BookTechnicalInfo } from './parts/book/BookTechnicalInfo'
import { BookCategorization } from './parts/book/BookCategorization'
import { useCustomForm, Form } from '@/presentation/react/components/ui/form'

interface BookFormProps {
  initialData?: Partial<BookFormData>
  onCancel: () => void
  onSave: (data: BookFormData) => void
}

export function BookForm({ initialData, onCancel, onSave }: BookFormProps) {
  const methods = useCustomForm<BookFormData>({
    schema: bookSchema,
    mode: 'onChange',
    defaultValues: {
      language: 'Português',
      ...initialData
    }
  })

  const {
    reset,
    formState: { isValid }
  } = methods

  useEffect(() => {
    if (initialData) {
      reset({
        language: 'Português',
        ...initialData
      })
    }
  }, [initialData, reset])

  return (
    <Form
      form={methods}
      onSubmit={onSave}
      className="flex flex-col gap-6"
      noValidate
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {}
        <BookCoverUpload />

        {}
        <div className="flex flex-col gap-8 lg:col-span-8">
          <BookGeneralInfo />
          <BookTechnicalInfo />
          <BookCategorization />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-200/10 pt-6 dark:border-slate-800/50">
        <button
          type="button"
          onClick={onCancel}
          className="h-11 rounded-lg border border-slate-200/10 px-6 font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800/50 dark:text-[#92adc9] dark:hover:bg-[#192633] dark:hover:text-white"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="flex h-11 items-center gap-2 rounded-lg bg-primary px-6 font-medium text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="check" />
          Salvar Obra
        </button>
      </div>
    </Form>
  )
}
