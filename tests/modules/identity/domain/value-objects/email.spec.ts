// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'

import { Email } from '@/modules/identity/domain/value-objects'
import { InvalidEmailError } from '@/modules/identity/domain/errors'

describe('Email Value Object', () => {
  describe('create', () => {
    it('should create a valid Email for a correct format', () => {
      const result = Email.create('user@example.com')

      expect(result.isRight()).toBe(true)
      if (result.isRight()) {
        expect(result.value.getValue()).toBe('user@example.com')
      }
    })

    it('should return InvalidEmailError for an empty string', () => {
      const result = Email.create('')

      expect(result.isLeft()).toBe(true)
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(InvalidEmailError)
      }
    })

    it('should return InvalidEmailError for missing @', () => {
      const result = Email.create('userexample.com')

      expect(result.isLeft()).toBe(true)
    })

    it('should return InvalidEmailError for missing domain', () => {
      const result = Email.create('user@')

      expect(result.isLeft()).toBe(true)
    })

    it('should return InvalidEmailError for missing local part', () => {
      const result = Email.create('@example.com')

      expect(result.isLeft()).toBe(true)
    })
  })

  describe('equals', () => {
    it('should return true for two emails with the same value', () => {
      const email1Result = Email.create('test@example.com')
      const email2Result = Email.create('test@example.com')

      if (email1Result.isRight() && email2Result.isRight()) {
        expect(email1Result.value.equals(email2Result.value)).toBe(true)
      } else {
        throw new Error('Expected valid emails')
      }
    })

    it('should return false for two emails with different values', () => {
      const email1Result = Email.create('test1@example.com')
      const email2Result = Email.create('test2@example.com')

      if (email1Result.isRight() && email2Result.isRight()) {
        expect(email1Result.value.equals(email2Result.value)).toBe(false)
      } else {
        throw new Error('Expected valid emails')
      }
    })
  })
})
