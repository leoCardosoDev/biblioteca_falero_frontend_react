import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/react/pages/login/login'
import { BrowserRouter } from 'react-router-dom'
import { InvalidCredentialsError } from '@/domain/errors'

// Prepare spies
const mocks = vi.hoisted(() => ({
  router: {
    navigate: vi.fn()
  },
  login: vi.fn(),
  isAuthenticated: false,
  isLoading: false
}))

// Mock AuthContext
vi.mock('@/presentation/react/hooks/use-auth-context', () => ({
  useAuthContext: () => ({
    login: mocks.login,
    signIn: vi.fn(),
    signOut: vi.fn(),
    user: undefined,
    isAuthenticated: mocks.isAuthenticated,
    isLoading: mocks.isLoading
  })
}))

const makeSut = () => {
  render(
    <BrowserRouter>
      <Login router={mocks.router} />
    </BrowserRouter>
  )
}

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.isAuthenticated = false
    mocks.isLoading = false
    // Default success behavior
    mocks.login.mockResolvedValue({
      accessToken: 'valid_token',
      name: 'valid_name',
      role: 'valid_role',
      refreshToken: 'valid_refresh_token'
    })
  })

  test('Should start with correct initial state', () => {
    makeSut()
    expect(screen.getByPlaceholderText('Digite seu login')).toHaveValue('')
    expect(screen.getByPlaceholderText('Digite sua senha')).toHaveValue('')
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()
  })

  test('Should call AuthContext.login with correct values', async () => {
    makeSut()

    const emailInput = screen.getByPlaceholderText('Digite seu login')
    const passwordInput = screen.getByPlaceholderText('Digite sua senha')
    const submitButton = screen.getByRole('button', { name: /entrar/i })

    fireEvent.change(emailInput, { target: { value: 'any_email@mail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'any_password' } })

    fireEvent.change(passwordInput, { target: { value: 'any_password' } })

    await waitFor(() => {
      expect(submitButton).toBeEnabled()
    })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mocks.login).toHaveBeenCalledTimes(1)
      expect(mocks.login).toHaveBeenCalledWith({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
    })
  })

  test('Should navigate to / on success', async () => {
    makeSut()

    const emailInput = screen.getByPlaceholderText('Digite seu login')
    const passwordInput = screen.getByPlaceholderText('Digite sua senha')
    const submitButton = screen.getByRole('button', { name: /entrar/i })

    fireEvent.change(emailInput, { target: { value: 'valid_email@mail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'valid_password' } })
    fireEvent.change(passwordInput, { target: { value: 'valid_password' } })

    await waitFor(() => {
      expect(submitButton).toBeEnabled()
    })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mocks.router.navigate).toHaveBeenCalledWith('/')
    })
  })

  test('Should display InvalidCredentialsError message on authentication failure', async () => {
    const error = new InvalidCredentialsError()
    mocks.login.mockRejectedValueOnce(error)
    makeSut()

    const emailInput = screen.getByPlaceholderText('Digite seu login')
    const passwordInput = screen.getByPlaceholderText('Digite sua senha')
    const submitButton = screen.getByRole('button', { name: /entrar/i })

    fireEvent.change(emailInput, {
      target: { value: 'invalid_email@mail.com' }
    })
    fireEvent.change(passwordInput, { target: { value: 'invalid_password' } })
    fireEvent.change(passwordInput, { target: { value: 'invalid_password' } })

    await waitFor(() => {
      expect(submitButton).toBeEnabled()
    })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument()
    })
  })

  test('Should display UnexpectedError message on other failures', async () => {
    const error = new Error('Something went wrong')
    mocks.login.mockRejectedValueOnce(error)
    makeSut()

    const emailInput = screen.getByPlaceholderText('Digite seu login')
    const passwordInput = screen.getByPlaceholderText('Digite sua senha')
    const submitButton = screen.getByRole('button', { name: /entrar/i })

    fireEvent.change(emailInput, { target: { value: 'any_email@mail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'any_password' } })

    await waitFor(() => {
      expect(submitButton).toBeEnabled()
    })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText('Erro inesperado. Tente novamente mais tarde.')
      ).toBeInTheDocument()
    })
  })

  test('Should navigate to / if already authenticated', async () => {
    mocks.isAuthenticated = true
    makeSut()
    await waitFor(() => {
      expect(mocks.router.navigate).toHaveBeenCalledWith('/')
    })
  })

  test('Should not render login form while loading authentication status', () => {
    mocks.isLoading = true
    makeSut()
    expect(
      screen.queryByPlaceholderText('Digite seu login')
    ).not.toBeInTheDocument()
  })
})
