import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import { UserForm } from '@/presentation/react/components/forms/user-form'
import type { User } from '@/domain/models/user'
import { LoadCityByIdSpy } from '../../../domain/mocks/mock-load-city-by-id'
import { LoadStateByIdSpy } from '../../../domain/mocks/mock-load-state-by-id'
import { LoadNeighborhoodByIdSpy } from '../../../domain/mocks/mock-load-neighborhood-by-id'

describe('UserForm Component', () => {
  vi.setConfig({ testTimeout: 30000 })

  const makeSut = (
    props: Partial<React.ComponentProps<typeof UserForm>> = {}
  ) => {
    const onSave = vi.fn()
    const onCancel = vi.fn()
    const loadAddressByZipCode = {
      perform: vi.fn()
    }
    const loadCityByIdSpy = new LoadCityByIdSpy()
    const loadStateByIdSpy = new LoadStateByIdSpy()
    const loadNeighborhoodByIdSpy = new LoadNeighborhoodByIdSpy()

    const user = userEvent.setup({ delay: null })
    const result = render(
      <UserForm
        onSave={onSave}
        onCancel={onCancel}
        loadAddressByZipCode={loadAddressByZipCode}
        loadCityById={loadCityByIdSpy}
        loadStateById={loadStateByIdSpy}
        loadNeighborhoodById={loadNeighborhoodByIdSpy}
        {...props}
      />
    )
    return {
      onSave,
      onCancel,
      user,
      loadAddressByZipCode,
      loadCityByIdSpy,
      loadStateByIdSpy,
      loadNeighborhoodByIdSpy,
      ...result
    }
  }

  test('Should render initial fields correctly', () => {
    makeSut()
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/rg/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/gênero/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cep/i)).toBeInTheDocument()

    // Address detail fields should remain hidden initially
    expect(screen.queryByLabelText(/rua/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/número/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/bairro/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/cidade/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/estado \(uf\)/i)).not.toBeInTheDocument()
  })

  test('Should have the submit button disabled when fields are empty', async () => {
    makeSut()
    expect(
      screen.getByRole('button', { name: /salvar usuário/i })
    ).toBeDisabled()
  })

  test('Should call onSave with correct values', async () => {
    const { onSave, user, loadAddressByZipCode } = makeSut()

    // Mock successful address lookup to reveal fields
    loadAddressByZipCode.perform.mockResolvedValue({
      street: 'Rua A',
      neighborhood: 'Centro',
      city: 'Sao Paulo',
      state: 'SP',
      neighborhoodId: '123e4567-e89b-12d3-a456-426614174000',
      cityId: '123e4567-e89b-12d3-a456-426614174001',
      stateId: '123e4567-e89b-12d3-a456-426614174002'
    })

    await user.type(screen.getByLabelText(/nome completo/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/rg/i), '1234567')
    await user.type(screen.getByLabelText(/cpf/i), '11111111111')
    await user.selectOptions(screen.getByLabelText(/gênero/i), 'MALE')

    // Perform CEP lookup to show address fields
    const cepInput = screen.getByLabelText(/cep/i)
    await user.type(cepInput, '63240970')
    const cepButton = screen.getByTestId('cep-search-button')
    await user.click(cepButton)

    // Wait for fields to appear
    await waitFor(() => {
      expect(screen.getByLabelText(/rua/i)).toBeInTheDocument()
    })

    // Verify pre-filled values are correct and Read-Only
    const streetInput = screen.getByLabelText(/rua/i)
    expect(streetInput).toHaveValue('Rua A')
    expect(streetInput).toHaveAttribute('readonly')
    expect(screen.getByLabelText(/bairro/i)).toHaveAttribute('readonly')
    expect(screen.getByLabelText(/cidade/i)).toHaveAttribute('readonly')
    expect(screen.getByLabelText(/estado \(uf\)/i)).toHaveAttribute('readonly')

    // Editable fields
    await user.type(screen.getByLabelText(/número/i), '123')
    await user.type(screen.getByLabelText(/complemento/i), 'Apt 101')

    await user.click(screen.getByRole('button', { name: /salvar usuário/i }))

    await waitFor(() => {
      if (onSave.mock.calls.length === 0) {
        // screen.debug()
        // console.log('Validation Errors present?')
      }
      expect(onSave).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(onSave.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          name: 'John Doe',
          email: 'john@example.com',
          cpf: '111.111.111-11',
          gender: 'MALE',
          address: expect.objectContaining({
            street: 'Rua A',
            city: 'Sao Paulo',
            zipCode: '63240-970',
            number: '123',
            complement: 'Apt 101'
          })
        })
      )
    })
  })

  test('Should load initialData correctly', async () => {
    const initialData = {
      name: 'Initial Name',
      email: 'initial@mail.com',
      rg: '123456789',
      cpf: '12345678901',
      role: 'ADMIN',
      status: 'ACTIVE',
      address: {
        street: 'Rua B',
        number: '456',
        neighborhood: 'Bairro B',
        city: 'City B',
        state: 'ST',
        zipCode: '12345678'
      }
    } as User
    makeSut({ initialData })

    await waitFor(() => {
      expect(screen.getByLabelText(/nome completo/i)).toHaveValue(
        'Initial Name'
      )
      expect(screen.getByLabelText(/email/i)).toHaveValue('initial@mail.com')
      // Fields should be visible because address.street is present
      expect(screen.getByLabelText(/rua/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/rua/i)).toHaveValue('Rua B')
      // Ensure masking is applied
      expect(screen.getByLabelText(/cpf/i)).toHaveValue('123.456.789-01')
      expect(screen.getByLabelText(/rg/i)).toHaveValue('12.345.678-9')
      expect(screen.getByLabelText(/cep/i)).toHaveValue('12345-678')
    })
  })

  test('Should call onCancel when cancel button is clicked', async () => {
    const { onCancel, user } = makeSut()
    await user.click(screen.getByRole('button', { name: /cancelar/i }))
    expect(onCancel).toHaveBeenCalled()
  })

  test('Should handle initialData without address correctly', async () => {
    const initialData = {
      id: '1',
      name: 'User Without Address',
      email: 'noaddress@example.com',
      role: 'STUDENT',
      status: 'ACTIVE',
      cpf: '11122233344',
      rg: '12345678',
      birthDate: '2000-01-01'
      // address is specifically undefined here
    } as unknown as User

    makeSut({ initialData })

    await waitFor(() => {
      expect(screen.getByLabelText(/nome completo/i)).toHaveValue(
        'User Without Address'
      )
      // Address fields should be hidden because zipCode is empty in initialData
      expect(screen.queryByLabelText(/rua/i)).not.toBeInTheDocument()
      expect(screen.queryByLabelText(/cidade/i)).not.toBeInTheDocument()
    })
  })

  test('Should show correct button label based on initialData', () => {
    const {
      rerender,
      loadAddressByZipCode,
      onSave,
      onCancel,
      loadCityByIdSpy,
      loadStateByIdSpy
    } = makeSut()
    expect(
      screen.getByRole('button', { name: /salvar usuário/i })
    ).toBeInTheDocument()

    const initialData = {
      name: 'Any Name',
      cpf: '11111111111',
      rg: '1234567',
      email: 'any@mail.com',
      role: 'STUDENT',
      status: 'ACTIVE',
      address: {
        street: 'Any Street',
        zipCode: '12345678',
        number: '123',
        neighborhood: 'Any Neighborhood',
        city: 'Any City',
        state: 'AS'
      }
    } as User
    rerender(
      <UserForm
        initialData={initialData}
        onSave={onSave}
        onCancel={onCancel}
        loadAddressByZipCode={loadAddressByZipCode}
        loadCityById={loadCityByIdSpy}
        loadStateById={loadStateByIdSpy}
        loadNeighborhoodById={new LoadNeighborhoodByIdSpy()}
      />
    )
    expect(
      screen.getByRole('button', { name: /salvar alterações/i })
    ).toBeInTheDocument()
  })

  test('Should load city and state names when only IDs are provided', async () => {
    const { loadCityByIdSpy, loadStateByIdSpy } = makeSut()

    // Configure spies
    loadCityByIdSpy.result = {
      id: 'any_city_id',
      name: 'Fetched City',
      stateId: 'any_state_id'
    }
    loadStateByIdSpy.result = {
      id: 'any_state_id',
      name: 'Fetched State',
      acronym: 'FS'
    }

    const initialData = {
      name: 'Any Name',
      email: 'any@mail.com',
      cpf: '11111111111',
      rg: '1234567',
      role: 'STUDENT',
      status: 'ACTIVE',
      address: {
        cityId: 'any_city_id',
        stateId: 'any_state_id',
        // empty names to simulate missing data
        city: '',
        state: '',
        neighborhood: 'Any Neighborhood',
        street: 'Any Street',
        number: '123',
        zipCode: '12345678'
      }
    } as User

    // Passing initialData to a new render via replacement of makeSut default would be tricky if makeSut doesn't accept spies config
    // But here we are passing initialData to the component via props in makeSut

    // We need to call makeSut again safely or refactor:
    // But simplified:

    render(
      <UserForm
        onSave={vi.fn()}
        onCancel={vi.fn()}
        loadAddressByZipCode={{ perform: vi.fn() }}
        loadCityById={loadCityByIdSpy}
        loadStateById={loadStateByIdSpy}
        loadNeighborhoodById={new LoadNeighborhoodByIdSpy()}
        initialData={initialData}
      />
    )

    await waitFor(() => {
      expect(screen.getByLabelText(/cidade/i)).toHaveValue('Fetched City')
      expect(screen.getByLabelText(/estado/i)).toHaveValue('FS')
    })

    expect(loadCityByIdSpy.callsCount).toBe(1)
    expect(loadStateByIdSpy.callsCount).toBe(1)
  })

  test('Should fallback to loading state from city.stateId when initialData.stateId is missing', async () => {
    const { loadCityByIdSpy, loadStateByIdSpy } = makeSut()

    // Configure spies
    const stateId = 'fallback_state_id'
    loadCityByIdSpy.result = {
      id: 'any_city_id',
      name: 'Fallback City',
      stateId: stateId
    }
    loadStateByIdSpy.result = {
      id: stateId,
      name: 'Fallback State',
      acronym: 'FB'
    }

    const initialData = {
      name: 'Fallback User',
      email: 'fallback@mail.com',
      cpf: '22222222222',
      rg: '87654321',
      role: 'STUDENT',
      status: 'ACTIVE',
      address: {
        cityId: 'any_city_id',
        // stateId is MISSING here
        city: '',
        state: '',
        neighborhood: 'Any Neighborhood',
        street: 'Any Street',
        number: '123',
        zipCode: '12345678'
      }
    } as User

    render(
      <UserForm
        onSave={vi.fn()}
        onCancel={vi.fn()}
        loadAddressByZipCode={{ perform: vi.fn() }}
        loadCityById={loadCityByIdSpy}
        loadStateById={loadStateByIdSpy}
        loadNeighborhoodById={new LoadNeighborhoodByIdSpy()}
        initialData={initialData}
      />
    )

    await waitFor(() => {
      expect(screen.getByLabelText(/cidade/i)).toHaveValue('Fallback City')
      expect(screen.getByLabelText(/estado/i)).toHaveValue('FB')
    })

    expect(loadCityByIdSpy.callsCount).toBe(1)
    // Should be called once for fallback
    expect(loadStateByIdSpy.callsCount).toBe(1)
    expect(loadStateByIdSpy.id).toBe(stateId)
  })

  test('Should load neighborhood name when only ID is provided', async () => {
    const { loadNeighborhoodByIdSpy } = makeSut()

    loadNeighborhoodByIdSpy.result = {
      id: 'nh_id',
      name: 'Fetched Neighborhood',
      cityId: 'city_id'
    }

    const initialData = {
      name: 'User',
      email: 'user@mail.com',
      role: 'STUDENT',
      status: 'ACTIVE',
      cpf: '33333333333',
      rg: '88888888',
      address: {
        neighborhoodId: 'nh_id',
        neighborhood: '', // Missing name
        cityId: 'city_id',
        stateId: 'state_id',
        zipCode: '12345678',
        street: 'Street',
        number: '1'
      }
    } as User

    render(
      <UserForm
        onSave={vi.fn()}
        onCancel={vi.fn()}
        loadAddressByZipCode={{ perform: vi.fn() }}
        loadCityById={{ perform: vi.fn().mockResolvedValue({}) }}
        loadStateById={{ perform: vi.fn().mockResolvedValue({}) }}
        loadNeighborhoodById={loadNeighborhoodByIdSpy}
        initialData={initialData}
      />
    )

    await waitFor(() => {
      expect(screen.getByLabelText(/bairro/i)).toHaveValue(
        'Fetched Neighborhood'
      )
    })

    expect(loadNeighborhoodByIdSpy.callsCount).toBe(1)
  })
})
