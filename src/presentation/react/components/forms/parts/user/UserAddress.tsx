import React from 'react'
import { useFormContext } from '@/presentation/react/components/ui/form'
import { Input, FormSection } from '@/presentation/react/components/ui'
import { maskZipCode } from '@/presentation/react/helpers/mask-utils'
import { LoadAddressByZipCode } from '@/domain/usecases/load-address-by-zip-code'
import { Button, Icon } from '@/presentation/react/components/ui'
import { UserFormData } from '@/presentation/react/components/forms/user-schema'
import { NotFoundError } from '@/domain/errors'

interface UserAddressProps {
  loadAddressByZipCode: LoadAddressByZipCode
}

export function UserAddress({ loadAddressByZipCode }: UserAddressProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<UserFormData>()

  const [isLoading, setIsLoading] = React.useState(false)
  const [isZipCodeResolved, setIsZipCodeResolved] = React.useState(false)
  const [searchError, setSearchError] = React.useState<string | null>(null)

  const watchedZipCode = watch('address.zipCode') ?? ''
  const watchedAddress = watch('address')

  React.useEffect(() => {
    if (
      watchedAddress?.street &&
      watchedAddress.street.trim().length > 0 &&
      watchedZipCode.replace(/\D/g, '').length === 8
    ) {
      setIsZipCodeResolved(true)
    }
  }, [watchedAddress?.street, watchedZipCode])

  const handleZipCodeLookup = async () => {
    const cleanZip = watchedZipCode.replace(/\D/g, '')

    setIsLoading(true)
    setSearchError(null)
    setIsZipCodeResolved(false)

    try {
      const address = await loadAddressByZipCode.perform(cleanZip)

      setValue('address.street', address.street, {
        shouldDirty: true,
        shouldValidate: true
      })
      setValue('address.neighborhood', address.neighborhood, {
        shouldDirty: true,
        shouldValidate: true
      })
      setValue('address.city', address.city, {
        shouldDirty: true,
        shouldValidate: true
      })
      setValue('address.state', address.state.toUpperCase(), {
        shouldDirty: true,
        shouldValidate: true
      })
      setValue('address.neighborhoodId', address.neighborhoodId)
      setValue('address.cityId', address.cityId)
      setValue('address.stateId', address.stateId)
      setIsZipCodeResolved(true)
    } catch (error) {
      if (error instanceof NotFoundError) {
        setSearchError('CEP não encontrado')
      } else {
        setSearchError('Erro interno. Contate o administrador')
      }
      setIsZipCodeResolved(false)
      setValue('address.street', '', { shouldValidate: false })
      setValue('address.neighborhood', '', { shouldValidate: false })
      setValue('address.city', '', { shouldValidate: false })
      setValue('address.state', '', { shouldValidate: false })
      setValue('address.neighborhoodId', '')
      setValue('address.cityId', '')
      setValue('address.stateId', '')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormSection title="Endereço">
      <div className="flex items-start gap-2">
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
            if (masked.replace(/\D/g, '').length !== 8) {
              setIsZipCodeResolved(false)
              setSearchError(null)
            }
          }}
          error={searchError || errors.address?.zipCode?.message}
          className="flex-1"
          required
        />
        <Button
          type="button"
          data-testid="cep-search-button"
          onClick={handleZipCodeLookup}
          disabled={isLoading || watchedZipCode.replace(/\D/g, '').length !== 8}
          className="mt-[26px] h-12 w-12"
        >
          {isLoading ? (
            <Icon name="loader" className="animate-spin" />
          ) : (
            <Icon name="search" />
          )}
        </Button>
      </div>

      {isZipCodeResolved && (
        <>
          <div className="hidden md:block" />
          <Input
            {...register('address.street')}
            id="street"
            label="Rua"
            value={watchedAddress?.street || ''}
            readOnly
            error={errors.address?.street?.message}
            className="md:col-span-2"
            inputClassName="bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed"
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
            {...register('address.complement')}
            id="complement"
            label="Complemento"
            error={errors.address?.complement?.message}
          />

          <Input
            {...register('address.neighborhood')}
            id="neighborhood"
            label="Bairro"
            value={watchedAddress?.neighborhood || ''}
            readOnly
            error={errors.address?.neighborhood?.message}
            inputClassName="bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed"
            required
          />

          <Input
            {...register('address.city')}
            id="city"
            label="Cidade"
            value={watchedAddress?.city || ''}
            readOnly
            error={errors.address?.city?.message}
            inputClassName="bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed"
            required
          />

          <Input
            {...register('address.state')}
            id="state"
            label="Estado (UF)"
            value={watchedAddress?.state || ''}
            maxLength={2}
            readOnly
            error={errors.address?.state?.message}
            inputClassName="bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed"
            required
          />
        </>
      )}
    </FormSection>
  )
}
