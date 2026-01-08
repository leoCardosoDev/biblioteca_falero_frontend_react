import React from 'react'
import { useFormContext } from '@/presentation/react/components/ui/form'
import { Input, FormSection } from '@/presentation/react/components/ui'
import { maskZipCode } from '@/presentation/react/helpers/mask-utils'
import { LoadAddressByZipCode } from '@/domain/usecases/load-address-by-zip-code'
import { Button, Icon } from '@/presentation/react/components/ui'
import { UserFormData } from '../../user-schema'

interface UserAddressProps {
  loadAddressByZipCode: LoadAddressByZipCode
}

export const UserAddress: React.FC<UserAddressProps> = ({
  loadAddressByZipCode
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<UserFormData>()

  const [isLoading, setIsLoading] = React.useState(false)
  const watchedZipCode = watch('address.zipCode') ?? ''

  const handleZipCodeLookup = async () => {
    const cleanZip = watchedZipCode.replace(/\D/g, '')
    if (cleanZip.length !== 8) {
      return
    }

    setIsLoading(true)
    try {
      const address = await loadAddressByZipCode.perform(cleanZip)

      setValue('address.street', address.street)
      setValue('address.neighborhood', address.neighborhood)
      setValue('address.city', address.city)
      setValue('address.state', address.state)
      setValue('address.neighborhoodId', address.neighborhoodId)
      setValue('address.cityId', address.cityId)
      setValue('address.stateId', address.stateId)
    } catch (_error) {
      // Ignore error for now or handle UI feedback
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormSection title="Endereço">
      <div className="flex items-end gap-2">
        <Input
          {...register('address.zipCode')}
          id="zipCode"
          label="CEP"
          value={watchedZipCode}
          placeholder="00000-000"
          onChange={(e) => {
            const masked = maskZipCode(e.target.value)
            setValue('address.zipCode', masked, {
              shouldValidate: true
            })
          }}
          error={errors.address?.zipCode?.message}
          className="flex-1"
          required
        />
        <Button
          type="button"
          data-testid="cep-search-button"
          onClick={handleZipCodeLookup}
          disabled={isLoading || watchedZipCode.replace(/\D/g, '').length !== 8}
          className="mb-[1px] h-11"
        >
          {isLoading ? (
            <Icon name="loader" className="animate-spin" />
          ) : (
            <Icon name="search" />
          )}
        </Button>
      </div>

      <div className="hidden md:block" />

      {!!watch('address.street') && (
        <>
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
            {...register('address.neighborhood')}
            id="neighborhood"
            label="Bairro"
            error={errors.address?.neighborhood?.message}
            required
          />

          <Input
            {...register('address.city')}
            id="city"
            label="Cidade"
            error={errors.address?.city?.message}
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
        </>
      )}
    </FormSection>
  )
}
