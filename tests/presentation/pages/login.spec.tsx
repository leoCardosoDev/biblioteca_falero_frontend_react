
import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages/login/login'
import { type Authentication, type AuthenticationParams } from '@/domain/usecases/authentication'
import { BrowserRouter } from 'react-router-dom'
import { type AccountModel } from '@/domain/models/account-model'
import { InvalidCredentialsError } from '@/domain/errors'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

// Mock Authentication
class AuthSpy implements Authentication {
  params: AuthenticationParams | undefined
  callsCount = 0
  account: AccountModel = { accessToken: 'any_token', name: 'any_name', role: 'any_role', refreshToken: 'any_refresh_token' }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return this.account
  }
}

const makeSut = () => {
  const authSpy = new AuthSpy()
  render(
    <BrowserRouter>
      <Login authentication={authSpy} />
    </BrowserRouter>
  )
  return {
    authSpy
  }
}

describe('Login Page', () => {
  test('Should start with correct initial state', () => {
    makeSut()
    // Check if inputs are empty
    expect(screen.getByPlaceholderText('Digite seu login')).toHaveValue('')
    expect(screen.getByPlaceholderText('Digite sua senha')).toHaveValue('')
    // specific button state if needed
    expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled()
  })

  test('Should call Authentication with correct values', async () => {
    const { authSpy } = makeSut()

    const emailInput = screen.getByPlaceholderText('Digite seu login')
    const passwordInput = screen.getByPlaceholderText('Digite sua senha')
    const submitButton = screen.getByRole('button', { name: /entrar/i })

    fireEvent.change(emailInput, { target: { value: 'any_email@mail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'any_password' } })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(authSpy.callsCount).toBe(1)
      expect(authSpy.params).toEqual({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
    })
  })

  test('Should navigate to / on success', async () => {
    const { authSpy } = makeSut()
    authSpy.account = {
      accessToken: 'valid_token',
      name: 'valid_name',
      role: 'valid_role',
      refreshToken: 'valid_refresh_token'
    }

    const emailInput = screen.getByPlaceholderText('Digite seu login')
    const passwordInput = screen.getByPlaceholderText('Digite sua senha')
    const submitButton = screen.getByRole('button', { name: /entrar/i })

    fireEvent.change(emailInput, { target: { value: 'valid_email@mail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'valid_password' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  test('Should display InvalidCredentialsError message on authentication failure', async () => {
    const { authSpy } = makeSut()
    const error = new InvalidCredentialsError()
    vi.spyOn(authSpy, 'auth').mockRejectedValueOnce(error)

    const emailInput = screen.getByPlaceholderText('Digite seu login')
    const passwordInput = screen.getByPlaceholderText('Digite sua senha')
    const submitButton = screen.getByRole('button', { name: /entrar/i })

    fireEvent.change(emailInput, { target: { value: 'invalid_email@mail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'invalid_password' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument()
    })
  })

  test('Should display UnexpectedError message on other failures', async () => {
    const { authSpy } = makeSut()
    const error = new Error('Something went wrong')
    vi.spyOn(authSpy, 'auth').mockRejectedValueOnce(error)

    const emailInput = screen.getByPlaceholderText('Digite seu login')
    const passwordInput = screen.getByPlaceholderText('Digite sua senha')
    const submitButton = screen.getByRole('button', { name: /entrar/i })

    fireEvent.change(emailInput, { target: { value: 'any_email@mail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'any_password' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Erro inesperado. Tente novamente mais tarde.')).toBeInTheDocument()
    })
  })
})
