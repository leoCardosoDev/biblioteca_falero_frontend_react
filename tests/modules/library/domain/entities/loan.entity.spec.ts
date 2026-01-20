import { describe, test, expect } from 'vitest'
import { Loan, Book } from '@/modules/library/domain'

describe('Loan Entity', () => {
  const mockBook = new Book({
    id: 'B001',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    coverUrl: 'http://example.com/cover.jpg',
    isbn: '978-0',
    category: 'Technology',
    status: 'Emprestado'
  })

  test('Should create a Loan with correct properties', () => {
    const loan = new Loan({
      id: 'L001',
      book: mockBook,
      userId: 'U001',
      userName: 'John Doe',
      loanDate: '2023-10-10',
      dueDate: '2023-10-24',
      status: 'Em Dia'
    })

    expect(loan.id).toBe('L001')
    expect(loan.book.id).toBe('B001')
    expect(loan.book.title).toBe('Clean Code')
    expect(loan.user.id).toBe('U001')
    expect(loan.status).toBe('Em Dia')
  })

  test('Should return true from isActive for non-returned loan', () => {
    const loan = new Loan({
      id: 'L001',
      book: mockBook,
      userId: 'U001',
      userName: 'Any User',
      loanDate: '2023-10-10',
      dueDate: '2023-10-24',
      status: 'Em Dia'
    })

    expect(loan.isActive()).toBe(true)
  })

  test('Should return false from isActive for returned loan', () => {
    const loan = new Loan({
      id: 'L001',
      book: mockBook,
      userId: 'U001',
      userName: 'Any User',
      loanDate: '2023-10-10',
      dueDate: '2023-10-24',
      returnDate: '2023-10-20',
      status: 'Devolvido'
    })

    expect(loan.isActive()).toBe(false)
  })
})
