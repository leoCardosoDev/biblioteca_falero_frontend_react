import { render, screen, waitFor, fireEvent } from '@testing-library/react'
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
    const loadAddressByZipCode = vi.fn()
    const user = userEvent.setup()
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

  test('Should render all fields correctly', () => {
    makeSut()
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/rg/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/perfil/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/rua/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/número/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/bairro/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cidade/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/estado \(uf\)/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cep/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/gênero/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument()
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
    const { onSave } = makeSut()

    fireEvent.change(screen.getByLabelText(/nome completo/i), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/rg/i), {
      target: { value: '1234567' }
    })
    fireEvent.change(screen.getByLabelText(/cpf/i), {
      target: { value: '11111111111' }
    })

    fireEvent.change(screen.getByLabelText(/rua/i), {
      target: { value: 'Rua A' }
    })
    fireEvent.change(screen.getByLabelText(/número/i), {
      target: { value: '123' }
    })
    fireEvent.change(screen.getByLabelText(/bairro/i), {
      target: { value: 'Centro' }
    })
    fireEvent.change(screen.getByLabelText(/cidade/i), {
      target: { value: 'Sao Paulo' }
    })
    fireEvent.change(screen.getByLabelText(/estado \(uf\)/i), {
      target: { value: 'SP' }
    })
    fireEvent.change(screen.getByLabelText(/cep/i), {
      target: { value: '01001000' }
    })
    fireEvent.change(screen.getByLabelText(/gênero/i), {
      target: { value: 'MALE' }
    })
    fireEvent.change(screen.getByLabelText(/telefone/i), {
      target: { value: '11999999999' }
    })

    fireEvent.click(screen.getByRole('button', { name: /salvar usuário/i }))

    await waitFor(() => {
      // Check only the first argument (data), ignoring the second argument (event)
      expect(onSave.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          name: 'John Doe',
          email: 'john@example.com',
          cpf: '111.111.111-11',
          gender: 'MALE',
          phone: '(11) 99999-9999',
          address: expect.objectContaining({
            street: 'Rua A',
            cityId: 'Sao Paulo',
            zipCode: '01001000'
          })
        })
      )
    })
  })

  // ... (keeping other tests unchanged until new failure spots)

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
      // Address fields should be empty
      expect(screen.getByLabelText(/rua/i)).toHaveValue('')
      expect(screen.getByLabelText(/cidade/i)).toHaveValue('')
    })
  })

  test('Should NOT search address when zip code has invalid length', async () => {
    const { user, loadAddressByZipCode } = makeSut()
    const zipInput = screen.getByLabelText(/cep/i)

    await user.type(zipInput, '11') // Only 2 digits (definitely invalid)
    await user.tab() // Trigger blur

    expect(loadAddressByZipCode).not.toHaveBeenCalled()
  })

  test('Should not fill fields when address search returns null', async () => {
    const { loadAddressByZipCode } = makeSut()
    loadAddressByZipCode.mockResolvedValueOnce(null)

    fireEvent.change(screen.getByLabelText(/cep/i), {
      target: { value: '12345678' }
    })
    fireEvent.blur(screen.getByLabelText(/cep/i))

    await waitFor(() => {
      expect(loadAddressByZipCode).toHaveBeenCalledWith('12345678')
    })

    // Should not have filled fields (checking one is enough)
    expect(screen.getByLabelText(/rua/i)).toHaveValue('')
  })

  test('Should show error when address search fails', async () => {
    const { user, loadAddressByZipCode } = makeSut()
    loadAddressByZipCode.mockRejectedValue(new Error())
    const zipInput = screen.getByLabelText(/cep/i)

    await user.type(zipInput, '12345678')
    await user.tab()

    // Using regex to match partially if needed, or exact text
    expect(await screen.findByText(/Erro ao buscar CEP/i)).toBeInTheDocument()
  })

  test('Should fill address fields when search succeeds', async () => {
    const { user, loadAddressByZipCode } = makeSut()
    loadAddressByZipCode.mockResolvedValue({
      street: 'Loaded Street',
      neighborhood: 'Loaded Neighborhood',
      city: 'Loaded City',
      state: 'LS'
    })
    const zipInput = screen.getByLabelText(/cep/i)

    await user.type(zipInput, '12345678')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByLabelText(/rua/i)).toHaveValue('Loaded Street')
      expect(screen.getByLabelText(/bairro/i)).toHaveValue(
        'Loaded Neighborhood'
      )
      expect(screen.getByLabelText(/cidade/i)).toHaveValue('Loaded City')
      expect(screen.getByLabelText(/estado \(uf\)/i)).toHaveValue('LS')
    })
  })
})
