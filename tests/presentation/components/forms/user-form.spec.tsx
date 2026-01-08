import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import { UserForm } from '@/presentation/react/components/forms/user-form'
import type { User } from '@/domain/models/user'

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
    const user = userEvent.setup({ delay: null })
    render(
      <UserForm
        onSave={onSave}
        onCancel={onCancel}
        loadAddressByZipCode={loadAddressByZipCode}
        {...props}
      />
    )
    return { onSave, onCancel, user, loadAddressByZipCode }
  }

  test('Should render initial fields correctly', () => {
    makeSut()
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/rg/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/gênero/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/perfil/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cep/i)).toBeInTheDocument()

    // Address detail fields should remain hidden initially
    expect(screen.queryByLabelText(/rua/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/número/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/bairro/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/cidade/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/estado \(uf\)/i)).not.toBeInTheDocument()
  })

  test('Should show validation errors for empty fields on submit', async () => {
    const { user } = makeSut()
    await user.click(screen.getByRole('button', { name: /salvar usuário/i }))

    expect(
      await screen.findByText(/nome deve ter pelo menos 3 caracteres/i)
    ).toBeInTheDocument()
    expect(await screen.findByText(/email inválido/i)).toBeInTheDocument()
    expect(await screen.findByText(/rg inválido/i)).toBeInTheDocument()
    expect(await screen.findByText(/cpf inválido/i)).toBeInTheDocument()
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

    // Now fields are pre-filled by the mock, but we can edit them if needed.
    // The test originally typed 'Rua A'. The mock returns 'Rua A'. So we don't need to type if it matches.
    // But we need to type Number.
    await user.type(screen.getByLabelText(/número/i), '123')

    // Verify pre-filled values are correct
    expect(screen.getByLabelText(/rua/i)).toHaveValue('Rua A')

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
            number: '123'
          })
        })
      )
    })
  })

  test('Should load initialData correctly', async () => {
    const initialData = {
      name: 'Initial Name',
      email: 'initial@mail.com',
      rg: '12.345.678-9',
      cpf: '123.456.789-01',
      role: 'ADMIN',
      status: 'ACTIVE',
      address: {
        street: 'Rua B',
        number: '456',
        neighborhood: 'Bairro B',
        city: 'City B',
        state: 'ST',
        zipCode: '12345-678'
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
      // Address fields should be hidden
      expect(screen.queryByLabelText(/rua/i)).not.toBeInTheDocument()
      expect(screen.queryByLabelText(/cidade/i)).not.toBeInTheDocument()
    })
  })
})
