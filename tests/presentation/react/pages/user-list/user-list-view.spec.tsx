// @vitest-environment jsdom
import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import type { UserListViewProps } from '@/presentation/react/pages/user-list/user-list-view'
import { UserListView } from '@/presentation/react/pages/user-list/user-list-view'
import type { User } from '@/domain/models'

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  cpf: '12345678901',
  rg: '1234567',
  role: 'STUDENT',
  status: 'ACTIVE',
  gender: 'MALE',
  createdAt: '2024-01-15T10:00:00Z', // Matching the fake system time month
  avatarUrl: 'http://example.com/avatar.jpg'
}

const mockProps: UserListViewProps = {
  users: [mockUser],
  isLoading: false,
  error: null,
  searchTerm: '',
  statusFilter: 'ALL',
  roleFilter: 'ALL',
  isUserModalOpen: false,
  isCredentialModalOpen: false,
  selectedUser: undefined,
  userForCredentials: null,
  onSearchChange: vi.fn(),
  onStatusFilterChange: vi.fn(),
  onRoleFilterChange: vi.fn(),
  onOpenCreate: vi.fn(),
  onOpenEdit: vi.fn(),
  onOpenCredentials: vi.fn(),
  onDeleteClick: vi.fn(),
  onCloseUserModal: vi.fn(),
  onCloseCredentialModal: vi.fn(),
  onSaveUser: vi.fn(),
  onSaveCredentials: vi.fn(),
  credentialError: null,
  loadAddressByZipCode: { perform: vi.fn() },
  loadCityById: { perform: vi.fn() },
  loadStateById: { perform: vi.fn() },
  loadNeighborhoodById: { perform: vi.fn() },
  isDeleteModalOpen: false,
  userToDelete: null,
  onCloseDeleteModal: vi.fn(),
  onConfirmDelete: vi.fn()
}

describe('UserListView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-15T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('Should render user list correctly', () => {
    render(<UserListView {...mockProps} />)
    const userRow = screen.getByRole('row', { name: /John Doe/i })

    expect(within(userRow).getByText('John Doe')).toBeInTheDocument()
    expect(within(userRow).getByText('Estudante')).toBeInTheDocument() // Badge format
    expect(within(userRow).getByText('Ativo')).toBeInTheDocument()
  })

  test('Should render loading state', () => {
    render(<UserListView {...mockProps} isLoading={true} />)
    expect(screen.getByText('Carregando usuários...')).toBeInTheDocument()
  })

  test('Should render error state', () => {
    render(<UserListView {...mockProps} error="Something went wrong" />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  test('Should handle search input', () => {
    render(<UserListView {...mockProps} />)
    const input = screen.getByPlaceholderText(
      'Buscar por nome, CPF ou email...'
    )
    fireEvent.change(input, { target: { value: 'Jane' } })
    expect(mockProps.onSearchChange).toHaveBeenCalledWith('Jane')
  })

  test('Should handle filters', () => {
    render(<UserListView {...mockProps} />)

    // Using getAllByRole 'combobox'
    const selects = screen.getAllByRole('combobox')
    const statusSel = selects[0]
    const roleSel = selects[1]

    fireEvent.change(statusSel, { target: { value: 'ACTIVE' } })
    expect(mockProps.onStatusFilterChange).toHaveBeenCalledWith('ACTIVE')

    fireEvent.change(roleSel, { target: { value: 'ADMIN' } })
    expect(mockProps.onRoleFilterChange).toHaveBeenCalledWith('ADMIN')
  })

  test('Should handle action buttons', () => {
    render(<UserListView {...mockProps} />)

    const credentialBtn = screen.getByTitle('Credenciais')
    fireEvent.click(credentialBtn)
    expect(mockProps.onOpenCredentials).toHaveBeenCalledWith(mockUser)

    const editBtn = screen.getByTitle('Editar')
    fireEvent.click(editBtn)
    expect(mockProps.onOpenEdit).toHaveBeenCalledWith(mockUser)

    const deleteBtn = screen.getByTitle('Apagar')
    fireEvent.click(deleteBtn)
    expect(mockProps.onDeleteClick).toHaveBeenCalledWith(mockUser)
  })

  test('Should handle create button', () => {
    render(<UserListView {...mockProps} />)
    const createBtn = screen.getByText('Novo Usuário')
    fireEvent.click(createBtn)
    expect(mockProps.onOpenCreate).toHaveBeenCalled()
  })

  test('Should render modals when open', () => {
    render(
      <UserListView
        {...mockProps}
        isUserModalOpen={true}
        isCredentialModalOpen={true}
        userForCredentials={mockUser}
      />
    )
    // Check for Modal title
    expect(screen.getByText('Cadastrar Novo Usuário')).toBeInTheDocument()
  })

  test('Should render Edit User title when selectedUser is provided', () => {
    render(
      <UserListView
        {...mockProps}
        isUserModalOpen={true}
        selectedUser={mockUser}
      />
    )
    expect(screen.getByText('Editar Usuário')).toBeInTheDocument()
  })

  test('user created this month logic in card', () => {
    render(<UserListView {...mockProps} />)
    expect(screen.getByTestId('total-users-count')).toHaveTextContent('1')
    expect(screen.getByTestId('new-users-count')).toHaveTextContent('1')
  })

  test('blocked users logic in card', () => {
    const blockedUser = { ...mockUser, id: '2', status: 'BLOCKED' as const }
    render(<UserListView {...mockProps} users={[blockedUser]} />)
    expect(screen.getByTestId('blocked-users-count')).toHaveTextContent('1')
  })

  test('user created last month should not count in new users', () => {
    // 2023-12-15 is last month relative to 2024-01-15
    const oldUser = { ...mockUser, createdAt: '2023-12-15T10:00:00Z' }
    render(<UserListView {...mockProps} users={[oldUser]} />)
    expect(screen.getByTestId('new-users-count')).toHaveTextContent('0')
  })

  test('user without createdAt logic (coverage)', () => {
    const userNoDate = { ...mockUser, createdAt: undefined } as unknown as User
    render(<UserListView {...mockProps} users={[userNoDate]} />)
    expect(screen.getByTestId('new-users-count')).toHaveTextContent('0')
  })

  test('format logic - INACTIVE', () => {
    const inactiveUser = {
      ...mockUser,
      id: '2',
      name: 'Inactive User',
      status: 'INACTIVE' as const
    }
    render(<UserListView {...mockProps} users={[inactiveUser]} />)

    const userRow = screen.getByRole('row', { name: /Inactive User/i })

    // Explicitly scope to the row to avoid finding the filter dropdown option
    expect(within(userRow).getByText('Inativo')).toBeInTheDocument()
  })

  test('format logic - BLOCKED', () => {
    const blockedUser = {
      ...mockUser,
      id: '3',
      name: 'Blocked User',
      status: 'BLOCKED' as const
    }
    render(<UserListView {...mockProps} users={[blockedUser]} />)

    const userRow = screen.getByRole('row', { name: /Blocked User/i })
    expect(within(userRow).getByText('Bloqueado')).toBeInTheDocument()
  })

  test('enrollmentId display - with enrollment', () => {
    const userWithEnrollment = { ...mockUser, enrollmentId: '123' }
    render(<UserListView {...mockProps} users={[userWithEnrollment]} />)
    expect(screen.getByText('Matrícula: 123')).toBeInTheDocument()
  })

  test('enrollmentId display - without enrollment', () => {
    const userWithoutEnrollment = { ...mockUser, enrollmentId: undefined }
    render(<UserListView {...mockProps} users={[userWithoutEnrollment]} />)
    expect(screen.getByText(/ID:/)).toBeInTheDocument()
  })

  test('Should render delete confirmation modal when open', () => {
    render(
      <UserListView
        {...mockProps}
        isDeleteModalOpen={true}
        userToDelete={mockUser}
      />
    )
    expect(
      screen.getByText(`Tem certeza que deseja excluir ${mockUser.name}?`)
    ).toBeInTheDocument()
  })

  test('Should call onConfirmDelete when delete is confirmed', async () => {
    const onConfirmDeleteMock = vi.fn().mockResolvedValue(undefined)

    render(
      <UserListView
        {...mockProps}
        isDeleteModalOpen={true}
        userToDelete={mockUser}
        onConfirmDelete={onConfirmDeleteMock}
      />
    )

    const confirmBtn = screen.getByText('Confirmar')
    fireEvent.click(confirmBtn)

    expect(onConfirmDeleteMock).toHaveBeenCalled()
  })

  test('Should call onCloseDeleteModal when delete is cancelled', () => {
    render(
      <UserListView
        {...mockProps}
        isDeleteModalOpen={true}
        userToDelete={mockUser}
      />
    )

    const cancelBtn = screen.getByText('Cancelar')
    fireEvent.click(cancelBtn)
    expect(mockProps.onCloseDeleteModal).toHaveBeenCalled()
  })
})
