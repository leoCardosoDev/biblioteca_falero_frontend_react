import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import { CredentialModal } from '@/presentation/react/components/credential-modal/credential-modal'

describe('CredentialModal Component', () => {
  vi.setConfig({ testTimeout: 10000 })
  const onSaveMock = vi.fn()
  const onCloseMock = vi.fn()
  const userName = 'any_user'

  test('Should not render if isOpen is false', () => {
    render(
      <CredentialModal
        isOpen={false}
        onClose={onCloseMock}
        onSave={onSaveMock}
        userName={userName}
      />
    )
    expect(screen.queryByText('Configurar Credenciais')).not.toBeInTheDocument()
  })

  test('Should render correctly if isOpen is true', () => {
    render(
      <CredentialModal
        isOpen={true}
        onClose={onCloseMock}
        onSave={onSaveMock}
        userName={userName}
      />
    )
    expect(screen.getByText('Configurar Credenciais')).toBeInTheDocument()
    expect(
      screen.getByText(`Defina o acesso para ${userName}`)
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/perfil/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('********')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /salvar senha/i })).toBeDisabled()
  })

  test('Should call onClose when Cancelar is clicked', async () => {
    const onCloseMock = vi.fn()
    const user = userEvent.setup()
    render(
      <CredentialModal
        isOpen={true}
        onClose={onCloseMock}
        onSave={vi.fn()}
        userName={userName}
      />
    )
    await user.click(screen.getByRole('button', { name: /cancelar/i }))
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  test('Should display validation errors for short password', async () => {
    const user = userEvent.setup()
    render(
      <CredentialModal
        isOpen={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
        userName={userName}
      />
    )

    const passwordInput = screen.getByPlaceholderText('********')
    await user.type(passwordInput, 'short')

    await waitFor(() => {
      expect(
        screen.getByText('A senha deve ter no mínimo 8 caracteres')
      ).toBeInTheDocument()
    })
  })

  test('Should call onSave with correct values when form is valid', async () => {
    const onSaveMock = vi.fn()
    const user = userEvent.setup()
    render(
      <CredentialModal
        isOpen={true}
        onClose={vi.fn()}
        onSave={onSaveMock}
        userName={userName}
        initialRole="PROFESSOR"
      />
    )

    const roleSelect = screen.getByLabelText(/perfil/i)
    const passwordInput = screen.getByPlaceholderText('********')

    await user.selectOptions(roleSelect, 'ADMIN')
    await user.type(passwordInput, 'Valid123')

    // Trigger submit
    const submitButton = screen.getByRole('button', { name: /salvar senha/i })
    expect(submitButton).toBeEnabled()
    await user.click(submitButton)

    await waitFor(() => {
      expect(onSaveMock).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'ADMIN',
          password: 'Valid123'
        }),
        expect.anything()
      )
    })
  })
})
