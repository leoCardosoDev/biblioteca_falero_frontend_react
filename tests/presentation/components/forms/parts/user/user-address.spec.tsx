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

  test('Should not call lookup if zip code is invalid or empty', async () => {
    const loadAddressByZipCodeSpy = makeLoadAddressByZipCodeSpy()
    render(
      <Wrapper>
        <UserAddress loadAddressByZipCode={loadAddressByZipCodeSpy} />
      </Wrapper>
    )

    const input = screen.getByLabelText(/cep/i)
    fireEvent.change(input, { target: { value: '123' } })

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()

    Object.defineProperty(button, 'disabled', { value: false })
    fireEvent.click(button)

    expect(loadAddressByZipCodeSpy.perform).not.toHaveBeenCalled()
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

  test('Should show address fields immediately if they are already populated', () => {
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
    expect(screen.getByLabelText(/rua/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/número/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/bairro/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cidade/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/estado \(uf\)/i)).toBeInTheDocument()

    expect(screen.getByLabelText(/rua/i)).toHaveValue('Existing Street')
  })
})
