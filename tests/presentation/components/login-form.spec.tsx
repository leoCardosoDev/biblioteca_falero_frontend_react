import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import { LoginForm } from '@/presentation/react/components/forms/login-form'

describe('LoginForm Component', () => {
  vi.setConfig({ testTimeout: 10000 })
  const mockOnSubmit = vi.fn()

  test('Should render with correct initial state', () => {
    render(<LoginForm isLoading={false} onSubmit={mockOnSubmit} />)
    expect(screen.getByPlaceholderText(/login/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()
  })

  test('Should render loading state correctly', () => {
    render(<LoginForm isLoading={true} onSubmit={mockOnSubmit} />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(screen.getByText(/entrando.../i)).toBeInTheDocument()
  })

  test('Should display error message if provided', () => {
    const errorMessage = 'any_error'
    render(
      <LoginForm
        isLoading={false}
        error={errorMessage}
        onSubmit={mockOnSubmit}
      />
    )
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  test('Should call onSubmit with valid data', async () => {
    render(<LoginForm isLoading={false} onSubmit={mockOnSubmit} />)
    const user = userEvent.setup()

    await user.type(screen.getByPlaceholderText(/login/i), 'test@example.com')
    await user.type(screen.getByPlaceholderText(/senha/i), 'password123')

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
          password: 'password123'
        }),
        expect.anything()
      )
    })
  })
})
