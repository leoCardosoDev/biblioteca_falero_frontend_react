import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { LoginForm } from '@/presentation/react/components/login-form'
import { useCustomForm, Form } from '@/presentation/react/components/ui/form'
import { z } from 'zod'

// Mock schema for testing
const schema = z.object({
  login: z.string(),
  password: z.string()
})

const TestWrapper = ({
  isLoading = false,
  error = ''
}: {
  isLoading?: boolean
  error?: string
}) => {
  const methods = useCustomForm({ schema })
  return (
    <Form form={methods} onSubmit={vi.fn()}>
      <LoginForm isLoading={isLoading} error={error} />
    </Form>
  )
}

describe('LoginForm Component', () => {
  test('Should render with correct initial state', () => {
    render(<TestWrapper />)
    expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled()
    expect(screen.queryByText('Entrando...')).not.toBeInTheDocument()
  })

  test('Should render loading state correctly', () => {
    render(<TestWrapper isLoading={true} />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(screen.getByText('Entrando...')).toBeInTheDocument()
    expect(screen.queryByText('Entrar')).not.toBeInTheDocument()
  })

  test('Should display error message if provided', () => {
    const errorMessage = 'any_error'
    render(<TestWrapper error={errorMessage} />)
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
})
