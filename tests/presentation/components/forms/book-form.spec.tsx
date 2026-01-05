import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import { BookForm } from '@/presentation/react/components/forms/book-form'
import type { Book } from '@/domain/models/book'

describe('BookForm Component', () => {
  vi.setConfig({ testTimeout: 15000 })
  const makeSut = (props: Partial<React.ComponentProps<typeof BookForm>> = {}) => {
    const onSave = vi.fn()
    const onCancel = vi.fn()
    const user = userEvent.setup()
    render(
      <BookForm
        onSave={onSave}
        onCancel={onCancel}
        {...props}
      />
    )
    return { onSave, onCancel, user }
  }

  test('Should render all fields correctly', () => {
    makeSut()
    expect(screen.getByLabelText(/^título da obra$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/autor/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/editora/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/ano/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/edição/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/quantidade/i)).toBeInTheDocument()
  })

  test('Should show validation errors for empty fields on submit', async () => {
    const { user } = makeSut()
    await user.click(screen.getByRole('button', { name: /salvar obra/i }))

    expect(await screen.findByText(/título é obrigatório/i)).toBeInTheDocument()
    expect(await screen.findByText(/autor é obrigatório/i)).toBeInTheDocument()
    expect(await screen.findByText(/ISBN é obrigatório/i)).toBeInTheDocument()
  })

  test('Should call onSave with correct numeric values', async () => {
    const { onSave, user } = makeSut()

    await user.type(screen.getByLabelText(/^título da obra$/i), 'Clean Code')
    await user.type(screen.getByLabelText(/autor/i), 'Robert C. Martin')
    await user.type(screen.getByLabelText(/editora/i), 'Pearson')
    await user.type(screen.getByLabelText(/ano/i), '2008')
    await user.type(screen.getByLabelText(/isbn/i), '978-0132350884')
    await user.type(screen.getByLabelText(/edição/i), '1')
    await user.type(screen.getByLabelText(/quantidade/i), '5')

    await user.click(screen.getByRole('button', { name: /salvar obra/i }))

    await waitFor(() => {
      expect(onSave.mock.calls[0][0]).toEqual(expect.objectContaining({
        title: 'Clean Code',
        author: 'Robert C. Martin',
        publisher: 'Pearson',
        year: 2008,
        isbn: '978-0132350884',
        edition: '1',
        quantity: 5
      }))
    })
  })

  test('Should load initialData correctly', async () => {
    const initialData = {
      title: 'Legacy Code',
      author: 'Michael Feathers',
      publisher: 'Prentice Hall',
      year: 2004,
      edition: 2,
      quantity: 3
    } as unknown as Book
    makeSut({ initialData })

    await waitFor(() => {
      expect(screen.getByLabelText(/^título da obra$/i)).toHaveValue('Legacy Code')
      expect(screen.getByLabelText(/ano/i)).toHaveValue(2004)
      expect(screen.getByLabelText(/quantidade/i)).toHaveValue(3)
    })
  })
})
