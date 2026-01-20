// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'

import { Name } from '@/modules/identity/domain/value-objects'
import { InvalidNameError } from '@/modules/identity/domain/errors'

describe('Name Value Object', () => {
  describe('create', () => {
    it('should create a valid Name for a correct format', () => {
      const result = Name.create('John Doe')

      expect(result.isRight()).toBe(true)
      if (result.isRight()) {
        expect(result.value.getValue()).toBe('John Doe')
      }
    })

    it('should trim whitespace from the name', () => {
      const result = Name.create('  Jane Doe  ')

      expect(result.isRight()).toBe(true)
      if (result.isRight()) {
        expect(result.value.getValue()).toBe('Jane Doe')
      }
    })

    it('should return InvalidNameError for an empty string', () => {
      const result = Name.create('')

      expect(result.isLeft()).toBe(true)
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(InvalidNameError)
      }
    })

    it('should return InvalidNameError for a name too short', () => {
      const result = Name.create('J')

      expect(result.isLeft()).toBe(true)
    })

    it('should return InvalidNameError for a name too long', () => {
      const longName = 'A'.repeat(101)
      const result = Name.create(longName)

      expect(result.isLeft()).toBe(true)
    })

    it('should accept name at minimum boundary (2 chars)', () => {
      const result = Name.create('Jo')

      expect(result.isRight()).toBe(true)
    })

    it('should accept name at maximum boundary (100 chars)', () => {
      const maxName = 'A'.repeat(100)
      const result = Name.create(maxName)

      expect(result.isRight()).toBe(true)
    })
  })

  describe('equals', () => {
    it('should return true for two names with the same value', () => {
      const name1Result = Name.create('John Doe')
      const name2Result = Name.create('John Doe')

      if (name1Result.isRight() && name2Result.isRight()) {
        expect(name1Result.value.equals(name2Result.value)).toBe(true)
      } else {
        throw new Error('Expected valid names')
      }
    })

    it('should return false for two names with different values', () => {
      const name1Result = Name.create('John Doe')
      const name2Result = Name.create('Jane Doe')

      if (name1Result.isRight() && name2Result.isRight()) {
        expect(name1Result.value.equals(name2Result.value)).toBe(false)
      } else {
        throw new Error('Expected valid names')
      }
    })
  })
})
