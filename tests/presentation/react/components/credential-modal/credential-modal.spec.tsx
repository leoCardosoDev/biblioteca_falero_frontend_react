// @vitest-environment jsdom
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import { CredentialModal } from '@/presentation/react/components/credential-modal/credential-modal'

describe('CredentialModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSave: vi.fn(),
    userName: 'John Doe',
    initialRole: 'STUDENT',
    initialStatus: 'ACTIVE'
  }

  test('Should render correctly when open', () => {
    render(<CredentialModal {...defaultProps} />)
    expect(screen.getByText('Gerenciar Acesso')).toBeInTheDocument()
    expect(
      screen.getByText('Defina o acesso para John Doe')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Perfil')).toBeInTheDocument()
    expect(screen.getByLabelText('Status')).toBeInTheDocument()
  })

  test('Should not render when closed', () => {
    render(<CredentialModal {...defaultProps} isOpen={false} />)
    expect(screen.queryByText('Gerenciar Acesso')).not.toBeInTheDocument()
  })

  test('Should call onClose when cancel button is clicked', async () => {
    const user = userEvent.setup()
    render(<CredentialModal {...defaultProps} />)
    await user.click(screen.getByText('Cancelar'))
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  test('Should validate password requirements', async () => {
    const user = userEvent.setup()
    render(<CredentialModal {...defaultProps} />)

    const passwordInput = screen.getByLabelText(/Senha/)
    await user.type(passwordInput, '123') // Too short

    const saveButton = screen.getByText('Salvar Alterações')
    // Validation is async or state-based, waiting for re-render
    await waitFor(() => expect(saveButton).toBeDisabled())

    await user.clear(passwordInput)
    await user.type(passwordInput, 'validPassword1') // Valid
    await waitFor(() => expect(saveButton).toBeEnabled())
  })

  test('Should render error message when error prop is provided', () => {
    const error = 'Any error message'
    render(<CredentialModal {...defaultProps} error={error} />)
    expect(screen.getByText(error)).toBeInTheDocument()
  })
})
