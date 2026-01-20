import { useEffect } from 'react'
import { Icon } from '@/shared/presentation/ui'
import {
  maskCpf,
  maskRg,
  maskZipCode
} from '@/shared/presentation/react/helpers/mask-utils'
import type { User } from '@/shared/domain/models/user'
import { UserGeneralInfo } from './parts/user/user-general-info'
import { UserAddress } from './parts/user/user-address'
import type {
  LoadAddressByZipCode,
  LoadCityById,
  LoadStateById,
  LoadNeighborhoodById
} from '@/shared/domain/usecases'
import type { UserFormData } from '@/shared/presentation/dtos/user-form-dto'
import { ZodValidatorAdapter } from '@/shared/presentation/adapters/validation/zod-validator-adapter'
import { userSchema } from '@/shared/infra/validation/schemas/user-schema'
import { useCustomForm, Form } from '@/shared/presentation/ui/form'

export type { UserFormData }

interface UserFormProps {
  initialData?: User
  onCancel: () => void
  onSave: (data: UserFormData) => void
  loadAddressByZipCode: LoadAddressByZipCode
  loadCityById: LoadCityById
  loadStateById: LoadStateById
  loadNeighborhoodById: LoadNeighborhoodById
}

export function UserForm({
  initialData,
  onCancel,
  onSave,
  loadAddressByZipCode,
  loadCityById,
  loadStateById,
  loadNeighborhoodById
}: UserFormProps) {
  const methods = useCustomForm<UserFormData>({
    validator: new ZodValidatorAdapter(userSchema),
    mode: 'onChange',
    defaultValues: {
      role: 'STUDENT',
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
        cpf: maskCpf(initialData.cpf),
        rg: maskRg(initialData.rg),
        role: (initialData.role?.toUpperCase() || 'STUDENT') as
          | 'ADMIN'
          | 'LIBRARIAN'
          | 'PROFESSOR'
          | 'STUDENT',
        gender: (initialData.gender?.toUpperCase() || 'OTHER') as
          | 'MALE'
          | 'FEMALE'
          | 'OTHER',
        address: initialData.address
          ? {
              ...initialData.address,
              state: initialData.address.state?.toUpperCase() || '',
              zipCode: maskZipCode(initialData.address.zipCode)
            }
          : {
              street: '',
              number: '',
              neighborhood: '',
              city: '',
              state: '',
              zipCode: '',
              complement: ''
            }
      })

      if (initialData.address?.cityId && !initialData.address.city) {
        loadCityById.perform(initialData.address.cityId).then((city) => {
          methods.setValue('address.city', city.name)

          if (
            !initialData.address?.stateId &&
            !initialData.address?.state &&
            city.stateId
          ) {
            loadStateById.perform(city.stateId).then((state) => {
              methods.setValue('address.state', state.acronym.toUpperCase())
              methods.setValue('address.stateId', state.id)
            })
          }
        })
      }

      if (initialData.address?.stateId && !initialData.address.state) {
        loadStateById.perform(initialData.address.stateId).then((state) => {
          methods.setValue('address.state', state.acronym.toUpperCase())
        })
      }

      if (
        initialData.address?.neighborhoodId &&
        !initialData.address.neighborhood
      ) {
        loadNeighborhoodById
          .perform(initialData.address.neighborhoodId)
          .then((neighborhood) => {
            methods.setValue('address.neighborhood', neighborhood.name)
          })
      }
    }
  }, [
    initialData,
    reset,
    loadCityById,
    loadStateById,
    loadNeighborhoodById,
    methods
  ])

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
          {initialData ? 'Salvar Alterações' : 'Salvar Usuário'}
        </button>
      </div>
    </Form>
  )
}
