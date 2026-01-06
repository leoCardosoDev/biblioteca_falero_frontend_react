import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import { ReservationForm } from '@/presentation/react/components/forms/reservation-form'

describe('ReservationForm Component', () => {
  const makeSut = (
    props: Partial<React.ComponentProps<typeof ReservationForm>> = {}
  ) => {
    const onSave = vi.fn()
    const onCancel = vi.fn()
    const user = userEvent.setup()
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

  test('Should show validation errors for empty fields on submit', async () => {
    const { user } = makeSut()
    await user.click(screen.getByRole('button', { name: /confirmar reserva/i }))

    await waitFor(async () => {
      // Expect validation messages for user and book
      expect(
        await screen.findByText(/selecione um usuário/i)
      ).toBeInTheDocument()
      expect(await screen.findByText(/selecione uma obra/i)).toBeInTheDocument()
    })
  })

  test('Should call onSave with correct values', async () => {
    const { onSave } = makeSut()

    // Select user "1" (John Doe)
    fireEvent.change(screen.getByLabelText(/usuário/i), {
      target: { value: '1' }
    })
    fireEvent.change(screen.getByLabelText(/obra/i), {
      target: { value: '123456' }
    })
    fireEvent.change(screen.getByLabelText(/prioridade/i), {
      target: { value: 'HIGH' }
    })
    fireEvent.change(screen.getByLabelText(/notas/i), {
      target: { value: 'Test notes' }
    })

    const submitButton = screen.getByRole('button', {
      name: /confirmar reserva/i
    })
    fireEvent.click(submitButton)

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
