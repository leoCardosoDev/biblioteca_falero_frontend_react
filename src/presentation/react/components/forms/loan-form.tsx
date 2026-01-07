import React, { useEffect } from 'react'
import { Icon } from '@/presentation/react/components/ui'
import { loanSchema, LoanFormData } from './loan-schema'
import { LoanParticipants } from './parts/loan/LoanParticipants'
import { LoanTerms } from './parts/loan/LoanTerms'
import { useCustomForm, Form } from '@/presentation/react/components/ui/form'

interface LoanFormProps {
  initialData?: Partial<LoanFormData>
  onCancel: () => void
  onSave: (data: LoanFormData) => void
}

export const LoanForm: React.FC<LoanFormProps> = ({
  initialData,
  onCancel,
  onSave
}) => {
  const methods = useCustomForm<LoanFormData>({
    schema: loanSchema,
    defaultValues: initialData || {
      loanDate: new Date().toISOString().split('T')[0]
    }
  })

  const { reset } = methods

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  return (
    <Form
      form={methods}
      onSubmit={onSave}
      className="flex flex-col gap-6"
      noValidate
    >
      <div className="flex flex-col gap-8">
        <LoanParticipants />
        <LoanTerms />
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
          className="flex h-11 items-center gap-2 rounded-lg bg-primary px-6 font-medium text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-600"
        >
          <Icon name="check" />
          Confirmar Empréstimo
        </button>
      </div>
    </Form>
  )
}
