import { describe, test, expect } from 'vitest'
import { Book } from '@/modules/library/domain'

describe('Book Entity', () => {
  test('Should create a Book with correct properties', () => {
    const book = new Book({
      id: '1',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      coverUrl: 'http://example.com/cover.jpg',
      isbn: '978-0-13-235088-4',
      category: 'Technology',
      status: 'available',
      pages: 464
    })

    expect(book.id).toBe('1')
    expect(book.title).toBe('Clean Code')
    expect(book.author).toBe('Robert C. Martin')
    expect(book.isbn).toBe('978-0-13-235088-4')
    expect(book.status).toBe('available')
    expect(book.pages).toBe(464)
  })

  test('Should return isAvailable as true when status is available', () => {
    const book = new Book({
      id: '1',
      title: 'Any Book',
      author: 'Any Author',
      coverUrl: 'http://example.com/cover.jpg',
      isbn: '123',
      category: 'Any',
      status: 'available'
    })

    expect(book.isAvailable).toBe(true)
    expect(book.isBorrowed).toBe(false)
  })

  test('Should return isBorrowed as true when status is borrowed', () => {
    const book = new Book({
      id: '1',
      title: 'Any Book',
      author: 'Any Author',
      coverUrl: 'http://example.com/cover.jpg',
      isbn: '123',
      category: 'Any',
      status: 'borrowed'
    })

    expect(book.isAvailable).toBe(false)
    expect(book.isBorrowed).toBe(true)
  })
})
