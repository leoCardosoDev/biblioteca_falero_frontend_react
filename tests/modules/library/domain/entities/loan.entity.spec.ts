import { describe, test, expect } from 'vitest'
import { Loan } from '@/modules/library/domain'

describe('Loan Entity', () => {
  test('Should create a Loan with correct properties', () => {
    const loan = new Loan({
      id: 'L001',
      bookId: 'B001',
      bookTitle: 'Clean Code',
      userId: 'U001',
      userName: 'John Doe',
      loanDate: new Date('2023-10-10'),
      dueDate: new Date('2023-10-24'),
      status: 'onTime'
    })

    expect(loan.id).toBe('L001')
    expect(loan.bookId).toBe('B001')
    expect(loan.bookTitle).toBe('Clean Code')
    expect(loan.userId).toBe('U001')
    expect(loan.status).toBe('onTime')
  })

  test('Should return isActive as true for non-returned loan', () => {
    const loan = new Loan({
      id: 'L001',
      bookId: 'B001',
      bookTitle: 'Any Book',
      userId: 'U001',
      userName: 'Any User',
      loanDate: new Date('2023-10-10'),
      dueDate: new Date('2023-10-24'),
      status: 'onTime'
    })

    expect(loan.isActive).toBe(true)
  })

  test('Should return isActive as false for returned loan', () => {
    const loan = new Loan({
      id: 'L001',
      bookId: 'B001',
      bookTitle: 'Any Book',
      userId: 'U001',
      userName: 'Any User',
      loanDate: new Date('2023-10-10'),
      dueDate: new Date('2023-10-24'),
      returnDate: new Date('2023-10-20'),
      status: 'returned'
    })

    expect(loan.isActive).toBe(false)
  })
})
