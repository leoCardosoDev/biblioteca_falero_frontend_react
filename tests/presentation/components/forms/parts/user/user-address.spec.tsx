import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { UserAddress } from '@/presentation/react/components/forms/parts/user/UserAddress'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  userSchema,
  type UserFormData
} from '@/presentation/react/components/forms/user-schema'
import type { LoadAddressByZipCode } from '@/domain/usecases/load-address-by-zip-code'
import { describe, test, expect, vi } from 'vitest'
import { NotFoundError } from '@/domain/errors'

const Wrapper: React.FC<{
  children: React.ReactNode
  defaultValues?: Partial<UserFormData>
}> = ({ children, defaultValues }) => {
  const methods = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: (defaultValues || {
      address: {
        zipCode: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: ''
      }
    }) as UserFormData
  })
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('UserAddress', () => {
  const makeLoadAddressByZipCodeSpy = (): LoadAddressByZipCode => ({
    perform: vi.fn().mockResolvedValue({
      street: 'any_street',
      neighborhood: 'any_neighborhood',
      city: 'any_city',
      state: 'SP',
      neighborhoodId: 'any_neighborhood_id',
      cityId: 'any_city_id',
      stateId: 'any_state_id'
    })
  })


  test('Should call lookup and fill fields on success', async () => {
    const loadAddressByZipCodeSpy = makeLoadAddressByZipCodeSpy()
    render(
      <Wrapper>
        <UserAddress loadAddressByZipCode={loadAddressByZipCodeSpy} />
      </Wrapper>
    )

    const input = screen.getByLabelText(/cep/i)
    fireEvent.change(input, { target: { value: '01001000' } })

    const button = screen.getByRole('button')
    expect(button).not.toBeDisabled()
    fireEvent.click(button)

    await waitFor(() => {
      expect(loadAddressByZipCodeSpy.perform).toHaveBeenCalledWith('01001000')
    })

    // Assert fields become visible and filled
    expect(screen.getByLabelText(/rua/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/rua/i)).toHaveValue('any_street')
    expect(screen.getByLabelText(/bairro/i)).toHaveValue('any_neighborhood')
    expect(screen.getByLabelText(/cidade/i)).toHaveValue('any_city')
    expect(screen.getByLabelText(/estado \(uf\)/i)).toHaveValue('SP')
  })

  test('Should show loading and hide search icon during lookup', async () => {
    const loadAddressByZipCodeSpy = {
      perform: vi.fn().mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  street: 'any_street',
                  neighborhood: 'any_neighborhood',
                  city: 'any_city',
                  state: 'SP',
                  neighborhoodId: 'any_neighborhood_id',
                  cityId: 'any_city_id',
                  stateId: 'any_state_id'
                }),
              100
            )
          )
      )
    }

    render(
      <Wrapper>
        <UserAddress loadAddressByZipCode={loadAddressByZipCodeSpy} />
      </Wrapper>
    )

    const input = screen.getByLabelText(/cep/i)
    fireEvent.change(input, { target: { value: '01001000' } })

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(screen.getByText('loader')).toBeInTheDocument()
    expect(screen.queryByText('search')).not.toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('search')).toBeInTheDocument()
    })
  })

  test('Should stop loading if lookup throws', async () => {
    const error = new Error('lookup_error')
    const loadAddressByZipCodeSpy = {
      perform: vi.fn().mockRejectedValue(error)
    }

    render(
      <Wrapper>
        <UserAddress loadAddressByZipCode={loadAddressByZipCodeSpy} />
      </Wrapper>
    )

    const input = screen.getByLabelText(/cep/i)
    fireEvent.change(input, { target: { value: '01001000' } })

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(screen.getByText('loader')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('search')).toBeInTheDocument()
    })

    expect(screen.getByText('Erro interno. Contate o administrador')).toBeInTheDocument()
    expect(screen.queryByLabelText(/rua/i)).not.toBeInTheDocument()
  })

  test('Should show specific error message for NotFoundError', async () => {
    const loadAddressByZipCodeSpy = {
      perform: vi.fn().mockRejectedValue(new NotFoundError())
    }

    render(
      <Wrapper>
        <UserAddress loadAddressByZipCode={loadAddressByZipCodeSpy} />
      </Wrapper>
    )

    const input = screen.getByLabelText(/cep/i)
    fireEvent.change(input, { target: { value: '01001000' } })

    const button = screen.getByRole('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('CEP não encontrado')).toBeInTheDocument()
    })

    expect(screen.queryByLabelText(/rua/i)).not.toBeInTheDocument()
  })

  test('Should clear address fields and hide them when lookup fails after a previous success', async () => {
    const loadAddressByZipCodeSpy = makeLoadAddressByZipCodeSpy()
    render(
      <Wrapper>
        <UserAddress loadAddressByZipCode={loadAddressByZipCodeSpy} />
      </Wrapper>
    )

    // First search: Success
    const input = screen.getByLabelText(/cep/i)
    fireEvent.change(input, { target: { value: '01001000' } })
    const button = screen.getByRole('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByLabelText(/rua/i)).toBeInTheDocument()
    })

    // Second search: Failure
    vi.mocked(loadAddressByZipCodeSpy.perform).mockRejectedValueOnce(new NotFoundError())
    fireEvent.change(input, { target: { value: '99999999' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('CEP não encontrado')).toBeInTheDocument()
    })

    expect(screen.queryByLabelText(/rua/i)).not.toBeInTheDocument()
  })

  test('Should handle undefined zip code', () => {
    const loadAddressByZipCodeSpy = makeLoadAddressByZipCodeSpy()
    render(
      <Wrapper
        defaultValues={{ address: { zipCode: '' } } as Partial<UserFormData>}
      >
        <UserAddress loadAddressByZipCode={loadAddressByZipCodeSpy} />
      </Wrapper>
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  test('Should show validation error when zip code is invalid', async () => {
    const loadAddressByZipCodeSpy = makeLoadAddressByZipCodeSpy()
    render(
      <Wrapper>
        <UserAddress loadAddressByZipCode={loadAddressByZipCodeSpy} />
      </Wrapper>
    )

    const input = screen.getByLabelText(/cep/i)
    fireEvent.change(input, { target: { value: '123' } })

    await waitFor(() => {
      expect(screen.getByText('CEP inválido')).toBeInTheDocument()
    })
  })

  test('Should hide address fields initially when no address data is present', () => {
    const loadAddressByZipCodeSpy = makeLoadAddressByZipCodeSpy()
    render(
      <Wrapper>
        <UserAddress loadAddressByZipCode={loadAddressByZipCodeSpy} />
      </Wrapper>
    )

    // Only ZIP code should be visible initially
    expect(screen.getByLabelText(/cep/i)).toBeInTheDocument()

    // Address fields should NOT be in the document
    expect(screen.queryByLabelText(/rua/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/número/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/bairro/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/cidade/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/estado \(uf\)/i)).not.toBeInTheDocument()
  })

  test('Should show address fields immediately if they are already populated', async () => {
    const loadAddressByZipCodeSpy = makeLoadAddressByZipCodeSpy()
    const defaultValues = {
      address: {
        zipCode: '01001-000',
        street: 'Existing Street',
        number: '100',
        neighborhood: 'Existing District',
        city: 'Existing City',
        state: 'ES'
      }
    }

    render(
      <Wrapper defaultValues={defaultValues}>
        <UserAddress loadAddressByZipCode={loadAddressByZipCodeSpy} />
      </Wrapper>
    )

    expect(screen.getByLabelText(/cep/i)).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByLabelText(/rua/i)).toBeInTheDocument()
    })
    expect(screen.getByLabelText(/número/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/bairro/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cidade/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/estado \(uf\)/i)).toBeInTheDocument()

    expect(screen.getByLabelText(/rua/i)).toHaveValue('Existing Street')
  })

  test('Should NOT resolve address automatically if street is empty', async () => {
    const loadAddressByZipCodeSpy = makeLoadAddressByZipCodeSpy()
    const defaultValues = {
      address: {
        zipCode: '01001-000',
        street: '   ', // Empty/Whitespace
        number: '100',
        neighborhood: 'Existing District',
        city: 'Existing City',
        state: 'ES'
      }
    }

    render(
      <Wrapper defaultValues={defaultValues}>
        <UserAddress loadAddressByZipCode={loadAddressByZipCodeSpy} />
      </Wrapper>
    )

    // Should NOT show address fields because street is effectively empty
    expect(screen.queryByLabelText(/rua/i)).not.toBeInTheDocument()
    expect(screen.getByLabelText(/cep/i)).toBeInTheDocument()
  })

  test('Should NOT resolve address automatically if zip code is incomplete', async () => {
    const loadAddressByZipCodeSpy = makeLoadAddressByZipCodeSpy()
    const defaultValues = {
      address: {
        zipCode: '123', // Invalid length
        street: 'Valid Street',
        number: '100',
        neighborhood: 'District',
        city: 'City',
        state: 'ES'
      }
    }

    render(
      <Wrapper defaultValues={defaultValues}>
        <UserAddress loadAddressByZipCode={loadAddressByZipCodeSpy} />
      </Wrapper>
    )

    // Should NOT show address fields despite street being present
    expect(screen.queryByLabelText(/rua/i)).not.toBeInTheDocument()
  })

  test('Should handle fallback when watch returns undefined/null', () => {
    const loadAddressByZipCodeSpy = makeLoadAddressByZipCodeSpy()
    // We can't easily force watch to return undefined with the current Wrapper/useForm setup unless we hack it or pass no defaults
    // But passing empty defaults in Wrapper:
    render(
      <Wrapper defaultValues={{} as Partial<UserFormData>}>
        <UserAddress loadAddressByZipCode={loadAddressByZipCodeSpy} />
      </Wrapper>
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  test('Should handle API returning undefined/partial data and default fields to empty string', async () => {
    const loadAddressByZipCodeSpy = {
      perform: vi.fn().mockResolvedValue({
        // Simulate broken/partial API response
        street: undefined,
        neighborhood: undefined,
        city: null, // Test null as well
        state: undefined,
        neighborhoodId: 'nid',
        cityId: 'cid',
        stateId: 'sid'
      })
    }
    // No default values to ensure watch returns undefined initially or reflects the setValue(undefined)
    render(
      <Wrapper defaultValues={{} as Partial<UserFormData>}>
        <UserAddress loadAddressByZipCode={loadAddressByZipCodeSpy as unknown as LoadAddressByZipCode} />
      </Wrapper>
    )

    const input = screen.getByLabelText(/cep/i)
    fireEvent.change(input, { target: { value: '01001000' } })

    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Wait for resolution logic to complete
    await waitFor(() => {
      // The inputs should appear because we set isZipCodeResolved = true in the success block
      expect(screen.getByLabelText(/rua/i)).toBeInTheDocument()
    })

    // Assert that the inputs fallback to empty strings instead of displaying "undefined" or crashing
    expect(screen.getByLabelText(/rua/i)).toHaveValue('')
    expect(screen.getByLabelText(/bairro/i)).toHaveValue('')
    expect(screen.getByLabelText(/cidade/i)).toHaveValue('')
    expect(screen.getByLabelText(/estado \(uf\)/i)).toHaveValue('')
  })
})
