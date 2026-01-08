import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import { ReservationForm } from '@/presentation/react/components/forms/reservation-form'

describe('ReservationForm Component', () => {
  const makeSut = (
    props: Partial<React.ComponentProps<typeof ReservationForm>> = {}
  ) => {
    const onSave = vi.fn()
    const onCancel = vi.fn()
    const user = userEvent.setup({ delay: null })
    render(<ReservationForm onSave={onSave} onCancel={onCancel} {...props} />)
    return { onSave, onCancel, user }
  }

  test('Should render all fields correctly', () => {
    makeSut()
    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/obra/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/data da reserva/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/prioridade/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/notas/i)).toBeInTheDocument()
  })

  test('Should set default reservation date to today', () => {
    makeSut()
    const today = new Date().toISOString().split('T')[0]
    expect(screen.getByLabelText(/data da reserva/i)).toHaveValue(today)
  })

  test('Should have the submit button disabled when fields are empty', async () => {
    makeSut()
    expect(
      screen.getByRole('button', { name: /confirmar reserva/i })
    ).toBeDisabled()
  })

  test('Should call onSave with correct values', async () => {
    const { onSave, user } = makeSut()

    // Select user "1" (John Doe)
    await user.selectOptions(screen.getByLabelText(/usuário/i), '1')
    await user.type(screen.getByLabelText(/obra/i), '123456')
    await user.selectOptions(screen.getByLabelText(/prioridade/i), 'HIGH')
    await user.type(screen.getByLabelText(/notas/i), 'Test notes')

    await user.click(screen.getByRole('button', { name: /confirmar reserva/i }))

    await waitFor(() => {
      expect(onSave.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          userId: '1',
          bookId: '123456',
          priority: 'HIGH',
          notes: 'Test notes'
        })
      )
    })
  })

  test('Should load initialData correctly', async () => {
    const initialData = {
      userId: '1',
      bookId: '123456',
      priority: 'MEDIUM',
      notes: 'Initial Notes',
      reservationDate: '2024-03-01'
    }
    makeSut({ initialData })

    await waitFor(() => {
      expect(screen.getByLabelText(/usuário/i)).toHaveValue('1')
      expect(screen.getByLabelText(/obra/i)).toHaveValue('123456')
      expect(screen.getByLabelText(/prioridade/i)).toHaveValue('MEDIUM')
      expect(screen.getByLabelText(/notas/i)).toHaveValue('Initial Notes')
    })
  })
})
