// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { UserListController } from '@/presentation/react/pages/user-list/user-list-controller'
import type {
  LoadUsers,
  AddUser,
  UpdateUser,
  DeleteUser,
  ManageUserAccess,
  LoadUserById,
  LoadAddressByZipCode,
  LoadCityById,
  LoadStateById,
  LoadNeighborhoodById
} from '@/domain/usecases'

// Mock dependencies
const mockLoadUsers: LoadUsers = { perform: vi.fn().mockResolvedValue([]) }
const mockAddUser: AddUser = { perform: vi.fn() }
const mockUpdateUser: UpdateUser = { perform: vi.fn() }
const mockDeleteUser: DeleteUser = { perform: vi.fn() }
const mockManageUserAccess: ManageUserAccess = { perform: vi.fn() }
const mockLoadUserById: LoadUserById = { perform: vi.fn() }
const mockLoadAddressByZipCode: LoadAddressByZipCode = { perform: vi.fn() }
const mockLoadCityById: LoadCityById = { perform: vi.fn() }
const mockLoadStateById: LoadStateById = { perform: vi.fn() }
const mockLoadNeighborhoodById: LoadNeighborhoodById = { perform: vi.fn() }

const defaultProps = {
  loadUsers: mockLoadUsers,
  addUser: mockAddUser,
  updateUser: mockUpdateUser,
  deleteUser: mockDeleteUser,
  manageUserAccess: mockManageUserAccess,
  loadUserById: mockLoadUserById,
  loadAddressByZipCode: mockLoadAddressByZipCode,
  loadCityById: mockLoadCityById,
  loadStateById: mockLoadStateById,
  loadNeighborhoodById: mockLoadNeighborhoodById
}

vi.mock('@/presentation/react/hooks', () => ({
  useUserManagement: () => ({
    users: [
      {
        id: '1',
        name: 'John',
        email: 'john@example.com',
        role: 'STUDENT',
        status: 'ACTIVE'
      }
    ],
    isLoading: false,
    error: null,
    handleAddUser: vi.fn().mockResolvedValue(true),
    handleUpdateUser: vi.fn().mockResolvedValue(true),
    handleDeleteUser: vi.fn().mockResolvedValue(true),
    handleManageAccess: vi.fn().mockResolvedValue({ success: true }),
    handleLoadUserById: vi
      .fn()
      .mockResolvedValue({ id: '1', name: 'John Full' })
  }),
  useUserFilter: () => [
    {
      id: '1',
      name: 'John',
      email: 'john@example.com',
      role: 'STUDENT',
      status: 'ACTIVE'
    }
  ]
}))

describe('UserListController', () => {
  test('Should render user list', () => {
    render(<UserListController {...defaultProps} />)
    expect(screen.getByText('John')).toBeInTheDocument()
  })
})
