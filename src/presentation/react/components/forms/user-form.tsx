import React, { useEffect } from 'react'
import { Icon } from '@/presentation/react/components/ui'
import { User } from '@/domain/models/user'
import { UserGeneralInfo } from './parts/user/UserGeneralInfo'
import { UserAddress } from './parts/user/UserAddress'
import { UserAccessControl } from './parts/user/UserAccessControl'
import { userSchema, UserFormData } from './user-schema'
import { useCustomForm, Form } from '@/presentation/react/components/ui/form'

export type { UserFormData }

interface UserFormProps {
  initialData?: User
  onCancel: () => void
  onSave: (data: UserFormData) => void
  loadAddressByZipCode: (zipCode: string) => Promise<unknown>
}

export const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onCancel,
  onSave,
  loadAddressByZipCode
}) => {
  const methods = useCustomForm<UserFormData>({
    schema: userSchema,
    defaultValues: {
      role: 'PROFESSOR',
      status: 'ACTIVE',
      gender: 'MALE',
      phone: ''
    }
  })

  const { reset } = methods

  useEffect(() => {
    if (initialData) {
      const data = initialData as User & { gender?: string; phone?: string }
      reset({
        name: initialData.name,
        email: initialData.email,
        cpf: initialData.cpf,
        rg: initialData.rg,
        role: initialData.role as
          | 'ADMIN'
          | 'LIBRARIAN'
          | 'PROFESSOR'
          | 'STUDENT',
        status: initialData.status as 'ACTIVE' | 'INACTIVE' | 'BLOCKED',
        gender: (data.gender as 'MALE' | 'FEMALE' | 'OTHER') || 'MALE',
        phone: data.phone || '',
        address: initialData.address || {
          street: '',
          number: '',
          complement: '',
          neighborhoodId: '',
          cityId: '',
          state: '',
          zipCode: ''
        }
      })
    }
  }, [initialData, reset])

  return (
    <Form
      form={methods}
      onSubmit={onSave}
      noValidate
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-8">
        <UserGeneralInfo />
        <UserAddress loadAddress={loadAddressByZipCode} />
        <UserAccessControl />
      </div>

      <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-200/10 pt-6 dark:border-slate-800/50">
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
          <Icon name="save" />
          Salvar Usuário
        </button>
      </div>
    </Form>
  )
}
