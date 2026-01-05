import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { LoginForm } from '@/presentation/react/components/login-form'
import type { UseFormRegister } from 'react-hook-form'
import type { LoginFormData } from '@/presentation/react/hooks/use-auth'

describe('LoginForm Component', () => {
  const registerMock = vi.fn() as unknown as UseFormRegister<LoginFormData>
  const handleSubmitMock = vi.fn()

  test('Should render with correct initial state', () => {
    render(
      <LoginForm
        register={registerMock}
        handleSubmit={handleSubmitMock}
        errors={{}}
        isLoading={false}
      />
    )
    expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled()
    expect(screen.queryByText('Entrando...')).not.toBeInTheDocument()
  })

  test('Should render loading state correctly', () => {
    render(
      <LoginForm
        register={registerMock}
        handleSubmit={handleSubmitMock}
        errors={{}}
        isLoading={true}
      />
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(screen.getByText('Entrando...')).toBeInTheDocument()
    expect(screen.queryByText('Entrar')).not.toBeInTheDocument()
  })

  test('Should display error message if provided', () => {
    const errorMessage = 'any_error'
    render(
      <LoginForm
        register={registerMock}
        handleSubmit={handleSubmitMock}
        errors={{}}
        isLoading={false}
        error={errorMessage}
      />
    )
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
})
