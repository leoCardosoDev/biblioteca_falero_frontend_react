import { describe, test, expect } from 'vitest'
import { bookSchema } from '@/presentation/react/components/forms/book-schema'

describe('bookSchema', () => {
  test('Should parse valid complete data', () => {
    const input = {
      title: 'Valid Book',
      author: 'Valid Author',
      publisher: 'Valid Publisher',
      isbn: '1234567890',
      year: '2023',
      language: 'PT-BR',
      quantity: '5',
      pages: '100',
      edition: '1st',
      genre: 'Fiction',
      synopsis: 'A good book',
      subtitle: 'Subtitle'
    }
    const result = bookSchema.safeParse(input)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.year).toBe(2023)
      expect(result.data.quantity).toBe(5)
      expect(result.data.pages).toBe(100)
    }
  })

  test('Should handle optional numeric fields with empty strings', () => {
    const input = {
      title: 'Brief Book',
      author: 'Author',
      publisher: 'Publisher',
      isbn: '123',
      year: '2023', // Year is required
      language: 'EN',
      quantity: '1',
      pages: '', // Should be undefined (optional)
    }
    const result = bookSchema.safeParse(input)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.pages).toBeUndefined()
      expect(result.data.quantity).toBe(1)
    }
  })

  test('Should validate required numeric fields (year, quantity)', () => {
    // Year empty -> undefined -> required error
    const inputYearEmpty = {
      title: 'Book',
      author: 'Auth',
      publisher: 'Pub',
      isbn: '111',
      language: 'EN',
      quantity: '1',
      year: ''
    }
    const resultYear = bookSchema.safeParse(inputYearEmpty)
    expect(resultYear.success).toBe(false)

    // Quantity empty -> undefined -> required error
    const inputQtyEmpty = {
      title: 'Book',
      author: 'Auth',
      publisher: 'Pub',
      isbn: '111',
      language: 'EN',
      year: '2023',
      quantity: ''
    }
    const resultQty = bookSchema.safeParse(inputQtyEmpty)
    expect(resultQty.success).toBe(false)
  })

  test('Should transform string numbers to actual numbers', () => {
    const input = {
      title: 'Book',
      author: 'Auth',
      publisher: 'Pub',
      isbn: '111',
      language: 'EN',
      quantity: '10',
      year: '2000',
      pages: '500'
    }
    const result = bookSchema.safeParse(input)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.quantity).toBe(10)
      expect(result.data.year).toBe(2000)
      expect(result.data.pages).toBe(500)
    }
  })
})
