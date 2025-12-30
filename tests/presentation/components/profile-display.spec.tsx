import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { ProfileDisplay } from '@/presentation/components/profile-display/profile-display'
import { useAuthContext } from '@/presentation/contexts/auth-context'
import type { AccountModel } from '@/domain/models/account-model'

vi.mock('@/presentation/contexts/auth-context')

describe('ProfileDisplay', () => {
  const mockUser: AccountModel = {
    name: 'Admin Falero',
    role: 'admin',
    avatarUrl: 'https://github.com/shadcn.png',
    accessToken: 'any_token',
    refreshToken: 'any_refresh_token'
  }

  beforeEach(() => {
    vi.mocked(useAuthContext).mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      signIn: vi.fn(),
      signOut: vi.fn()
    })
  })

  test('Should render user name and role', () => {
    render(<ProfileDisplay />)

    expect(screen.getByText(mockUser.name)).toBeInTheDocument()
    expect(screen.getByText('Administrador')).toBeInTheDocument()
  })

  test('Should render user avatar', () => {
    render(<ProfileDisplay />)

    const avatar = screen.getByLabelText('Avatar')
    expect(avatar).toHaveStyle(`background-image: url('${mockUser.avatarUrl}')`)
  })

  test('Should render nothing if user is null', () => {
    vi.mocked(useAuthContext).mockReturnValue({
      user: undefined,
      isAuthenticated: false,
      isLoading: false,
      signIn: vi.fn(),
      signOut: vi.fn()
    } as any)

    const { container } = render(<ProfileDisplay />)
    expect(container).toBeEmptyDOMElement()
  })
})
