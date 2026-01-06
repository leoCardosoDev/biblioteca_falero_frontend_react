import React from 'react'
import { useFormContext } from '@/presentation/react/components/ui/form'
import { Input, FormSection } from '@/presentation/react/components/ui'
import { maskZipCode } from '@/presentation/react/helpers/mask-utils'
import { UserFormData } from '@/presentation/react/components/forms/user-schema'
import { Address } from '@/domain/models/user'

interface UserAddressProps {
  loadAddress: (zipCode: string) => Promise<unknown>
}

export const UserAddress: React.FC<UserAddressProps> = ({ loadAddress }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<UserFormData>()

  const [isLoading, setIsLoading] = React.useState(false)
  const [zipError, setZipError] = React.useState<string | null>(null)
  const watchedZipCode = watch('address.zipCode')

  const handleZipCodeBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const zipCode = e.target.value.replace(/\D/g, '')
    if (zipCode.length !== 8) return

    setIsLoading(true)
    setZipError(null)
    try {
      const address = (await loadAddress(zipCode)) as Address // Temporary cast until strict Address type is fully integrated
      if (address) {
        setValue('address.street', address.street)
        setValue('address.neighborhoodId', address.neighborhood)
        setValue('address.cityId', address.city)
        setValue('address.state', address.state)
        // Clear errors for fields if any
        setValue('address.street', address.street, { shouldValidate: true })
        // Note: ID fields might need specific handling if they are IDs vs Names from API
      }
    } catch (_error) {
      setZipError('Erro ao buscar CEP')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormSection title="Endereço">
      <div className="relative">
        <Input
          {...register('address.zipCode')}
          id="zipCode"
          label="CEP"
          value={watchedZipCode || ''}
          placeholder="00000-000"
          onChange={(e) => {
            setValue('address.zipCode', maskZipCode(e.target.value), {
              shouldValidate: true
            })
          }}
          onBlur={handleZipCodeBlur}
          error={errors.address?.zipCode?.message || zipError}
          required
        />
        {isLoading && (
          <div className="absolute right-3 top-9">
            <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        )}
      </div>

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
        {...register('address.neighborhoodId')}
        id="neighborhoodId"
        label="Bairro"
        error={errors.address?.neighborhoodId?.message}
        required
      />

      <Input
        {...register('address.cityId')}
        id="cityId"
        label="Cidade"
        error={errors.address?.cityId?.message}
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
  )
}
