import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { Users } from '@/presentation/react/pages/user-list/user-list-page'
import type { User } from '@/domain/models/user'
import type { AddUserLogin } from '@/domain/usecases/add-user-login'
import type { LoadAddressByZipCode } from '@/domain/usecases/load-address-by-zip-code'

// Mock the hook
const mocks = vi.hoisted(() => ({
  useUserManagement: vi.fn()
}))

vi.mock('@/presentation/react/hooks/use-user-management', () => ({
  useUserManagement: mocks.useUserManagement
}))

// Mock child components
vi.mock('@/presentation/react/components/forms', () => ({
  UserForm: ({
    onSave,
    onCancel
  }: {
    onSave: (data: unknown) => void
    onCancel: () => void
  }) => (
    <>
      <button onClick={() => onSave({ name: 'New User' })}>
        Save User Mock
      </button>
      <button
        onClick={() =>
          onSave({
            name: 'New User',
            address: {
              zipCode: '12345678',
              street: 'Test St',
              number: '123',
              neighborhoodId: 'NbId',
              cityId: 'CityId',
              state: 'ST'
            }
          })
        }
      >
        Save User Address Mock
      </button>
      <button onClick={onCancel}>Cancel User Mock</button>
    </>
  )
}))

vi.mock(
  '@/presentation/react/components/credential-modal/credential-modal',
  () => ({
    CredentialModal: ({
      onSave,
      onClose,
      isOpen
    }: {
      onSave: (data: unknown) => void
      onClose: () => void
      isOpen: boolean
    }) =>
      isOpen ? (
        <>
          <button
            onClick={() =>
              onSave({
                username: 'user',
                password: 'pass',
                confirmPassword: 'pass'
              })
            }
          >
            Save Creds Mock
          </button>
          <button onClick={onClose}>Cancel Creds Mock</button>
        </>
      ) : null
  })
)

const makeSut = () => {
  const props = {
    loadUsers: {} as never,
    addUser: {} as never,
    updateUser: {} as never,
    deleteUser: {} as never,
    addUserLogin: {} as never,
    loadUserById: {} as never,
    loadAddressByZipCode: { perform: vi.fn() } as never
  }
  render(<Users {...props} />)
}

describe('User List Page', () => {
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'STUDENT',
      status: 'ACTIVE',
      enrollmentId: '123',
      cpf: '111.111.111-11',
      avatarUrl: 'any_url',
      rg: '1234567'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'PROFESSOR',
      status: 'BLOCKED',
      enrollmentId: '456',
      cpf: '222.222.222-22',
      avatarUrl: 'any_url',
      rg: '7654321'
    }
  ]

  beforeEach(() => {
    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })
  })

  test('Should render all users initially', () => {
    makeSut()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  test('Should filter by text (name)', () => {
    makeSut()
    const input = screen.getByPlaceholderText(
      'Buscar por nome, CPF ou email...'
    )
    fireEvent.change(input, { target: { value: 'John' } })
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
  })

  test('Should filter by status', () => {
    makeSut()
    const selects = screen.getAllByRole('combobox')
    // First select is Status
    const statusSelect = selects[0]
    fireEvent.change(statusSelect, { target: { value: 'BLOCKED' } })

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  test('Should filter by role', () => {
    makeSut()
    const selects = screen.getAllByRole('combobox')
    // Second select is Group (Role)
    const roleSelect = selects[1]
    fireEvent.change(roleSelect, { target: { value: 'STUDENT' } })

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
  })

  test('Should show loading state', () => {
    mocks.useUserManagement.mockReturnValue({
      users: [],
      isLoading: true,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })
    makeSut()
    expect(screen.getByText('Carregando usuários...')).toBeInTheDocument()
  })

  test('Should show error state', () => {
    mocks.useUserManagement.mockReturnValue({
      users: [],
      isLoading: false,
      error: 'Erro fatal',
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })
    makeSut()
    expect(screen.getByText('Erro fatal')).toBeInTheDocument()
  })

  test('Should render fallback for user with missing role', () => {
    const usersWithMissingRole = [{ ...mockUsers[0], id: '3', role: undefined }]
    mocks.useUserManagement.mockReturnValue({
      users: usersWithMissingRole,
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })
    makeSut()
    expect(screen.getByText('Desconhecido')).toBeInTheDocument()
  })

  test('Should open user form when clicking new user button', () => {
    makeSut()
    const newUserButton = screen.getByRole('button', { name: /novo usuário/i })
    fireEvent.click(newUserButton)
    // Now mocking form, look for our mock button or just the container interactions.
    // The Modal title should still be there
    expect(screen.getByText('Cadastrar Novo Usuário')).toBeInTheDocument()
    // Verify our mock is there
    expect(screen.getByText('Save User Mock')).toBeInTheDocument()
  })

  test('Should call handleAddUser when new user is saved', async () => {
    const handleAddUser = vi.fn().mockResolvedValue(true)
    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser,
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })
    makeSut()

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /novo usuário/i }))

    // Click mock save
    fireEvent.click(screen.getByText('Save User Mock'))

    await waitFor(() => {
      expect(handleAddUser).toHaveBeenCalled()
    })
    // Success modal should be shown
    expect(screen.getByText('Usuário Criado')).toBeInTheDocument()
    expect(screen.getByText(/cadastrado com sucesso/i)).toBeInTheDocument()
  })

  test('Should open credential modal when clicking key icon', () => {
    makeSut()
    const keyButton = screen.getAllByTitle('Credenciais')[0]
    fireEvent.click(keyButton)
    // Mock credential modal
    expect(screen.getByText('Save Creds Mock')).toBeInTheDocument()
  })

  test('Should load full user and open modal when clicking edit', async () => {
    const handleLoadUserById = vi.fn().mockResolvedValue({
      ...mockUsers[0],
      address: {
        street: 'Street',
        number: '1',
        neighborhood: 'N',
        city: 'C',
        state: 'ST',
        zipCode: '00000-000'
      }
    })
    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById
    })
    makeSut()
    const editButton = screen.getAllByTitle('Editar')[0]
    fireEvent.click(editButton)

    await React.act(async () => {
      /* wait for promise */
    })

    expect(handleLoadUserById).toHaveBeenCalledWith('1')
    expect(screen.getByText('Editar Usuário')).toBeInTheDocument()
  })

  test('Should call handleUpdateUser when editing user is saved', async () => {
    const handleUpdateUser = vi.fn().mockResolvedValue(true)
    const handleLoadUserById = vi
      .fn()
      .mockResolvedValue({ id: '1', name: 'John' })
    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser,
      handleDeleteUser: vi.fn(),
      handleLoadUserById
    })
    makeSut()

    // Open edit modal
    const editButton = screen.getAllByTitle('Editar')[0]
    fireEvent.click(editButton)
    await React.act(async () => {})

    // Click mock save
    fireEvent.click(screen.getByText('Save User Mock'))

    await waitFor(() => {
      expect(handleUpdateUser).toHaveBeenCalledWith(
        expect.objectContaining({ id: '1' })
      )
    })
  })

  test('Should call handleDeleteUser when clicking delete and confirming', () => {
    const handleDeleteUser = vi.fn()
    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser,
      handleLoadUserById: vi.fn()
    })

    // Mock window.confirm
    const confirmSpy = vi.spyOn(window, 'confirm')
    confirmSpy.mockImplementation(() => true)

    makeSut()
    const deleteButton = screen.getAllByTitle('Apagar')[0]
    fireEvent.click(deleteButton)

    expect(confirmSpy).toHaveBeenCalled()
    expect(handleDeleteUser).toHaveBeenCalledWith('1')

    confirmSpy.mockRestore()
  })

  test('Should NOT call handleDeleteUser when clicking delete and cancelling', () => {
    const handleDeleteUser = vi.fn()
    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser,
      handleLoadUserById: vi.fn()
    })

    const confirmSpy = vi.spyOn(window, 'confirm')
    confirmSpy.mockImplementation(() => false)

    makeSut()
    const deleteButton = screen.getAllByTitle('Apagar')[0]
    fireEvent.click(deleteButton)

    expect(confirmSpy).toHaveBeenCalled()
    expect(handleDeleteUser).not.toHaveBeenCalled()

    confirmSpy.mockRestore()
  })

  test('Should NOT open edit modal if user load fails', async () => {
    const handleLoadUserById = vi.fn().mockResolvedValue(null)
    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById
    })
    makeSut()
    const editButton = screen.getAllByTitle('Editar')[0]
    fireEvent.click(editButton)

    await React.act(async () => {})

    expect(handleLoadUserById).toHaveBeenCalled()
    expect(screen.queryByText('Editar Usuário')).not.toBeInTheDocument()
  })

  test('Should handle onSaveUser failure (modal stays open)', async () => {
    const handleAddUser = vi.fn().mockResolvedValue(false)
    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser,
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })
    makeSut()

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /novo usuário/i }))
    // Click mock save
    fireEvent.click(screen.getByText('Save User Mock'))

    await waitFor(() => {
      expect(handleAddUser).toHaveBeenCalled()
      // Error modal should be shown
      expect(screen.getByText('Erro na Operação')).toBeInTheDocument()
    })
    // Modal should still be open but "Cadastrar Novo Usuário" title is in background
    // and UserForm is still there. But StatusModal is on top.
  })

  test('Should handle credential save success', async () => {
    const addUserLoginPerform = vi.fn().mockResolvedValue(undefined)
    const props = {
      loadUsers: {} as never,
      addUser: {} as never,
      updateUser: {} as never,
      deleteUser: {} as never,
      addUserLogin: { perform: addUserLoginPerform } as unknown as AddUserLogin,
      loadUserById: {} as never,
      loadAddressByZipCode: {
        perform: vi.fn()
      } as unknown as LoadAddressByZipCode
    }

    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })

    render(<Users {...props} />)

    // Open credential modal
    const keyButton = screen.getAllByTitle('Credenciais')[0]
    fireEvent.click(keyButton)

    // Click mock save
    fireEvent.click(screen.getByText('Save Creds Mock'))

    await React.act(async () => {})

    expect(addUserLoginPerform).toHaveBeenCalledWith({
      userId: '1',
      username: 'user',
      password: 'pass'
    })
  })

  test('Should handle credential save error', async () => {
    const addUserLoginPerform = vi
      .fn()
      .mockRejectedValue(new Error('Any error'))
    const props = {
      loadUsers: {} as never,
      addUser: {} as never,
      updateUser: {} as never,
      deleteUser: {} as never,
      addUserLogin: { perform: addUserLoginPerform } as unknown as AddUserLogin,
      loadUserById: {} as never,
      loadAddressByZipCode: {
        perform: vi.fn()
      } as unknown as LoadAddressByZipCode
    }

    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })

    render(<Users {...props} />)

    // Open credential modal
    const keyButton = screen.getAllByTitle('Credenciais')[0]
    fireEvent.click(keyButton)

    // Click mock save
    fireEvent.click(screen.getByText('Save Creds Mock'))

    await React.act(async () => {})

    expect(addUserLoginPerform).toHaveBeenCalled()
  })

  test('Should render correct elements based on user data', () => {
    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })
    makeSut()

    expect(screen.getByText(/Matrícula: 123/)).toBeInTheDocument()
    // Using getAllByText because "Ativo" and "Bloqueado" appear in the filter dropdowns too
    expect(screen.getAllByText('Ativo').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Bloqueado').length).toBeGreaterThan(0)
  })

  test('Should render ID when enrollmentId is missing', () => {
    const userWithoutEnrollment = {
      ...mockUsers[0],
      id: '123456789',
      enrollmentId: undefined
    }
    mocks.useUserManagement.mockReturnValue({
      users: [userWithoutEnrollment],
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })
    makeSut()
    expect(screen.getByText(/ID: 12345678/)).toBeInTheDocument()
  })

  test('Should close user modal when pressing Escape', async () => {
    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })
    makeSut()

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /novo usuário/i }))
    expect(screen.getByText('Cadastrar Novo Usuário')).toBeInTheDocument()

    // Press Escape
    fireEvent.keyDown(window, { key: 'Escape' })

    await waitFor(() => {
      expect(
        screen.queryByText('Cadastrar Novo Usuário')
      ).not.toBeInTheDocument()
    })
  })

  test('Should close user modal when clicking cancel button in form', async () => {
    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })
    makeSut()

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /novo usuário/i }))
    expect(screen.getByText('Cadastrar Novo Usuário')).toBeInTheDocument()

    // Click cancel button from mocked UserForm
    fireEvent.click(screen.getByText('Cancel User Mock'))

    await waitFor(() => {
      expect(
        screen.queryByText('Cadastrar Novo Usuário')
      ).not.toBeInTheDocument()
    })
  })

  test('Should close credential modal when clicking cancel button', async () => {
    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })
    makeSut()

    // Open credential modal
    const keyButton = screen.getAllByTitle('Credenciais')[0]
    fireEvent.click(keyButton)
    expect(screen.getByText('Save Creds Mock')).toBeInTheDocument()

    // Click cancel button from mocked CredentialModal (which calls onClose)
    fireEvent.click(screen.getByText('Cancel Creds Mock'))

    await waitFor(
      () => {
        expect(screen.queryByText('Save Creds Mock')).not.toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  test('Should call handleAddUser with address data when saving new user', async () => {
    const handleAddUser = vi.fn().mockResolvedValue(true)
    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser,
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })
    makeSut()

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /novo usuário/i }))

    // Click mock save with address
    fireEvent.click(screen.getByText('Save User Address Mock'))

    await waitFor(() => {
      expect(handleAddUser).toHaveBeenCalledWith(
        expect.objectContaining({
          address: expect.objectContaining({
            zipCode: '12345678'
          })
        })
      )
    })
  })

  test('Should close status modal', async () => {
    const handleAddUser = vi.fn().mockResolvedValue(true)
    mocks.useUserManagement.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
      handleAddUser,
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })
    makeSut()

    // Trigger success status modal
    fireEvent.click(screen.getByRole('button', { name: /novo usuário/i }))
    fireEvent.click(screen.getByText('Save User Mock'))

    await waitFor(() => {
      expect(screen.getByText('Usuário Criado')).toBeInTheDocument()
    })

    // Click "Entendi" button
    fireEvent.click(screen.getByText('Entendi'))

    await waitFor(() => {
      expect(screen.queryByText('Usuário Criado')).not.toBeInTheDocument()
    })
  })
})
