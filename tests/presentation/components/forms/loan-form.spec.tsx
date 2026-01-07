import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import { LoanForm } from '@/presentation/react/components/forms/loan-form'

describe('LoanForm Component', () => {
  const makeSut = (
    props: Partial<React.ComponentProps<typeof LoanForm>> = {}
  ) => {
    const onSave = vi.fn()
    const onCancel = vi.fn()
    const user = userEvent.setup({ delay: null })
    render(<LoanForm onSave={onSave} onCancel={onCancel} {...props} />)
    return { onSave, onCancel, user }
  }

  test('Should render all fields correctly', () => {
    makeSut()
    expect(screen.getByLabelText(/leitor/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/obra/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/data do empréstimo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/previsão de devolução/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/observações/i)).toBeInTheDocument()
  })

  test('Should set default loan date to today', () => {
    makeSut()
    const today = new Date().toISOString().split('T')[0]
    expect(screen.getByLabelText(/data do empréstimo/i)).toHaveValue(today)
  })

  test('Should show validation errors for empty fields on submit', async () => {
    const { user } = makeSut()
    await user.click(
      screen.getByRole('button', { name: /confirmar empréstimo/i })
    )

    await waitFor(async () => {
      // Use findAllByText to handle potential multiple matches or ensure at least one
      const participantsErrors = await screen.findAllByText(/selecione/i)
      expect(participantsErrors.length).toBeGreaterThan(0)
    })
  })

  test('Should call onSave with correct values', async () => {
    const { onSave, user } = makeSut()

    // Select user "1" which corresponds to "John Doe" in the component
    await user.selectOptions(screen.getByLabelText(/leitor/i), '1')
    await user.type(screen.getByLabelText(/obra/i), '123456')
    await user.type(
      screen.getByLabelText(/previsão de devolução/i),
      '2024-02-01'
    )
    await user.type(screen.getByLabelText(/observações/i), 'Test observations')

    await user.click(
      screen.getByRole('button', { name: /confirmar empréstimo/i })
    )

    await waitFor(() => {
      // Assert on the first argument of the first call
      expect(onSave.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          userId: '1',
          bookId: '123456',
          expectedReturnDate: '2024-02-01',
          observations: 'Test observations'
        })
      )
    })
  })

  test('Should load initialData correctly', async () => {
    const initialData = {
      userId: '1', // Needs to be a valid option
      bookId: '123456',
      observations: 'Initial Observations',
      loanDate: '2024-01-01',
      expectedReturnDate: '2024-01-15'
    }
    makeSut({ initialData })

    await waitFor(() => {
      expect(screen.getByLabelText(/leitor/i)).toHaveValue('1')
      expect(screen.getByLabelText(/obra/i)).toHaveValue('123456')
      expect(screen.getByLabelText(/observações/i)).toHaveValue(
        'Initial Observations'
      )
    })
  })
})
