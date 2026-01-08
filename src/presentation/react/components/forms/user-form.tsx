import React, { useEffect } from 'react'
import { Icon } from '../ui'
import { User } from '@/domain/models/user'
import { UserGeneralInfo } from './parts/user/UserGeneralInfo'
import { UserAddress } from './parts/user/UserAddress'
import { UserAccessControl } from './parts/user/UserAccessControl'
import { LoadAddressByZipCode } from '@/domain/usecases/load-address-by-zip-code'
import { userSchema, UserFormData } from './user-schema'
import { useCustomForm, Form } from '@/presentation/react/components/ui/form'

export type { UserFormData }

interface UserFormProps {
  initialData?: User
  onCancel: () => void
  onSave: (data: UserFormData) => void
  loadAddressByZipCode: LoadAddressByZipCode
}

export const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onCancel,
  onSave,
  loadAddressByZipCode
}) => {
  const methods = useCustomForm<UserFormData>({
    schema: userSchema,
    mode: 'onChange',
    defaultValues: {
      role: 'STUDENT',
      status: 'ACTIVE',
      gender: 'OTHER',
      address: {
        zipCode: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
      }
    }
  })

  const {
    reset,
    formState: { isValid }
  } = methods

  useEffect(() => {
    if (initialData) {
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
        gender: (initialData.gender as 'MALE' | 'FEMALE' | 'OTHER') || 'OTHER',
        address: initialData.address || {
          street: '',
          number: '',
          neighborhood: '',
          city: '',
          state: '',
          zipCode: '',
          complement: ''
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
        <UserAddress loadAddressByZipCode={loadAddressByZipCode} />
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
          disabled={!isValid}
          className="flex h-11 items-center gap-2 rounded-lg bg-primary px-6 font-medium text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="save" />
          Salvar Usuário
        </button>
      </div>
    </Form>
  )
}
