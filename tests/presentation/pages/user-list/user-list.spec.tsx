
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Users } from '@/presentation/react/pages/user-list/user-list-page'
import type { User } from '@/domain/models/user'

// Mock the hook
const mocks = vi.hoisted(() => ({
  useUserManagement: vi.fn()
}))

vi.mock('@/presentation/react/hooks/use-user-management', () => ({
  useUserManagement: mocks.useUserManagement
}))

const makeSut = () => {
  // Dummy props with explicit casting to avoid 'any' if interface is not exported, 
  // or better use 'unknown' then cast:
  // Actually UsersProps is not exported but Users is. 
  // We can just cast to correct types or use 'as never' for mocks if allow.
  // Cleanest is to satisfy the prop types with minimal valid objects.
  const props = {
    loadUsers: {} as never,
    addUser: {} as never,
    updateUser: {} as never,
    deleteUser: {} as never,
    addUserLogin: {} as never,
    loadUserById: {} as never
  }
  render(<Users {...props} />)
}

describe('User List Page', () => {
  const mockUsers: User[] = [
    {
      id: '1', name: 'John Doe', email: 'john@example.com', role: 'STUDENT', status: 'ACTIVE', enrollmentId: '123', cpf: '111.111.111-11', avatarUrl: 'any_url',
      rg: '1234567', birthDate: '2000-01-01'
    },
    {
      id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'PROFESSOR', status: 'BLOCKED', enrollmentId: '456', cpf: '222.222.222-22', avatarUrl: 'any_url',
      rg: '7654321', birthDate: '1980-01-01'
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
    const input = screen.getByPlaceholderText('Buscar por nome, CPF ou email...')
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
})
