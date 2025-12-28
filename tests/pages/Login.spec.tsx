import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Login } from '../../src/presentation/pages/login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import type { Authentication } from '../../src/domain/usecases/authentication'

// Mock dependencies
const mockAuth: Authentication = {
  auth: vi.fn()
}

// Wrapper for QueryClient
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
})
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('Login Page', () => {
  it('should render login form elements', () => {
    render(<Login authentication={mockAuth} />, { wrapper })

    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar no sistema/i })).toBeInTheDocument()
  })

  it('should show validation errors on invalid submit', async () => {
    const user = userEvent.setup()
    render(<Login authentication={mockAuth} />, { wrapper })

    const button = screen.getByRole('button', { name: /entrar no sistema/i })
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument()
      expect(screen.getByText(/a senha deve ter no mínimo/i)).toBeInTheDocument()
    })
  })

  // Further tests for successful submission can be added after initial implementation
})
