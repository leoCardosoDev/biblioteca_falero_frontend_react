import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { Users } from '@/presentation/react/pages/user-list/user-list-page'
import type { User } from '@/domain/models/user'
import type { AddUserLogin } from '@/domain/usecases/add-user-login'

// Mock the hook
const mocks = vi.hoisted(() => ({
  useUserManagement: vi.fn(),
  CredentialModal: vi.fn()
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
      <button onClick={onCancel}>Cancel User Mock</button>
    </>
  )
}))

vi.mock(
  '@/presentation/react/components/credential-modal/credential-modal',
  () => ({
    CredentialModal: mocks.CredentialModal
  })
)

// Setup default mock implementation
mocks.CredentialModal.mockImplementation(
  ({
    onSave,
    onClose,
    isOpen,
    initialRole
  }: {
    onSave: (data: unknown) => void
    onClose: () => void
    isOpen: boolean
    initialRole?: string
  }) =>
    isOpen ? (
      <>
        <button
          onClick={() =>
            onSave({
              password: 'pass',
              role: (initialRole as unknown as 'STUDENT') || 'STUDENT'
            })
          }
        >
          Save Creds Mock
        </button>
        <button onClick={onClose}>Cancel Creds Mock</button>
      </>
    ) : null
)

const makeSut = () => {
  const props = {
    loadUsers: {} as never,
    addUser: {} as never,
    updateUser: {} as never,
    deleteUser: {} as never,
    addUserLogin: {} as never,
    loadUserById: {} as never,
    loadAddressByZipCode: {} as never
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
      rg: '1234567',
      gender: 'MALE',
      createdAt: new Date().toISOString()
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
      rg: '7654321',
      gender: 'FEMALE',
      createdAt: new Date().toISOString()
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

    // Click mock save and wait for it
    await React.act(async () => {
      fireEvent.click(screen.getByText('Save User Mock'))
    })

    expect(handleAddUser).toHaveBeenCalled()
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

    // Click mock save and wait for it
    await React.act(async () => {
      fireEvent.click(screen.getByText('Save User Mock'))
    })

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
    // Click mock save and wait
    await React.act(async () => {
      fireEvent.click(screen.getByText('Save User Mock'))
    })

    expect(handleAddUser).toHaveBeenCalled()
    // Modal should still be open (title present)
    expect(screen.getByText('Cadastrar Novo Usuário')).toBeInTheDocument()
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
      loadAddressByZipCode: {} as never
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

    // Click mock save and wait
    await React.act(async () => {
      fireEvent.click(screen.getByText('Save Creds Mock'))
    })

    expect(addUserLoginPerform).toHaveBeenCalledWith({
      userId: '1',
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
      loadAddressByZipCode: {} as never
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

    await waitFor(() => {
      expect(screen.queryByText('Save Creds Mock')).not.toBeInTheDocument()
    })
  })

  test('Should not update user role if it has not changed during credential save', async () => {
    const handleUpdateUser = vi.fn().mockResolvedValue(true)
    const addUserLoginPerform = vi.fn().mockResolvedValue(true)

    // User role is STUDENT
    const user = { ...mockUsers[0], role: 'STUDENT' }

    mocks.useUserManagement.mockReturnValue({
      users: [user],
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser,
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })

    const props = {
      loadUsers: {} as never,
      addUser: {} as never,
      updateUser: {} as never,
      deleteUser: {} as never,
      addUserLogin: { perform: addUserLoginPerform } as unknown as AddUserLogin,
      loadUserById: {} as never,
      loadAddressByZipCode: {} as never
    }

    render(<Users {...props} />)

    // Open credential modal
    const keyButton = screen.getAllByTitle('Credenciais')[0]
    fireEvent.click(keyButton)

    // Click verify credentials mock
    fireEvent.click(screen.getByText('Save Creds Mock'))

    await React.act(async () => {})

    expect(handleUpdateUser).not.toHaveBeenCalled()
    expect(addUserLoginPerform).toHaveBeenCalled()
  })

  test('Should update user role if it HAS changed during credential save', async () => {
    const handleUpdateUser = vi.fn().mockResolvedValue(true)
    const addUserLoginPerform = vi.fn().mockResolvedValue(true)

    // User role is STUDENT
    const user = { ...mockUsers[0], role: 'STUDENT' }

    mocks.useUserManagement.mockReturnValue({
      users: [user],
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser,
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })

    const props = {
      loadUsers: {} as never,
      addUser: {} as never,
      updateUser: {} as never,
      deleteUser: {} as never,
      addUserLogin: { perform: addUserLoginPerform } as unknown as AddUserLogin,
      loadUserById: {} as never,
      loadAddressByZipCode: {} as never
    }

    render(<Users {...props} />)

    // Mock credential save with DIFFERENT role
    mocks.CredentialModal.mockImplementationOnce(
      ({ onSave }: { onSave: (data: unknown) => void }) => (
        <button
          onClick={() =>
            onSave({
              password: 'p',
              role: 'PROFESSOR' // Different from STUDENT
            })
          }
        >
          Save Different Role
        </button>
      )
    )

    // Open credential modal
    const keyButton = screen.getAllByTitle('Credenciais')[0]
    fireEvent.click(keyButton)

    // Click verify credentials mock
    fireEvent.click(screen.getByText('Save Different Role'))

    await React.act(async () => {})

    expect(handleUpdateUser).toHaveBeenCalledWith({
      id: user.id,
      role: 'PROFESSOR'
    })
    expect(addUserLoginPerform).toHaveBeenCalled()
  })

  test('Should handle user with missing createdAt in stats', () => {
    const userNoDate = { ...mockUsers[0], id: '3', createdAt: undefined }
    mocks.useUserManagement.mockReturnValue({
      users: [userNoDate, mockUsers[0]],
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })
    makeSut()
    // The stats calculation should not crash and should just ignore this user.
    expect(screen.getByText('Total de Usuários')).toBeInTheDocument()
  })

  test('Should render status colors correctly', () => {
    const inactiveUser = {
      ...mockUsers[0],
      id: '3',
      status: 'INACTIVE',
      email: 'inactive@test.com',
      cpf: '000.000.000-00',
      enrollmentId: '999'
    }
    const blockedUser = {
      ...mockUsers[0],
      id: '4',
      status: 'BLOCKED',
      email: 'blocked@test.com',
      cpf: '000.000.000-01',
      enrollmentId: '888'
    }

    mocks.useUserManagement.mockReturnValue({
      users: [inactiveUser, blockedUser],
      isLoading: false,
      error: null,
      handleAddUser: vi.fn(),
      handleUpdateUser: vi.fn(),
      handleDeleteUser: vi.fn(),
      handleLoadUserById: vi.fn()
    })
    makeSut()

    // Check for Inactive specific text
    expect(screen.getAllByText('Inativo').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Bloqueado').length).toBeGreaterThan(0)
  })
})
