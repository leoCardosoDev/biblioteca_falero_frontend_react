/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'

import { Left, Right, left, right } from '@/shared/application/common/either'

describe('Either Pattern', () => {
  describe('Left', () => {
    it('should create a Left instance with the provided value', () => {
      const error = new Error('Something went wrong')
      const leftResult = new Left(error)

      expect(leftResult.value).toBe(error)
    })

    it('should return true for isLeft()', () => {
      const leftResult = new Left('error')

      expect(leftResult.isLeft()).toBe(true)
    })

    it('should return false for isRight()', () => {
      const leftResult = new Left('error')

      expect(leftResult.isRight()).toBe(false)
    })
  })

  describe('Right', () => {
    it('should create a Right instance with the provided value', () => {
      const data = { id: 1, name: 'Test' }
      const rightResult = new Right(data)

      expect(rightResult.value).toBe(data)
    })

    it('should return false for isLeft()', () => {
      const rightResult = new Right('success')

      expect(rightResult.isLeft()).toBe(false)
    })

    it('should return true for isRight()', () => {
      const rightResult = new Right('success')

      expect(rightResult.isRight()).toBe(true)
    })
  })

  describe('left() helper function', () => {
    it('should create a Left instance', () => {
      const result = left('error')

      expect(result).toBeInstanceOf(Left)
      expect(result.value).toBe('error')
    })

    it('should be typed as Either', () => {
      const result = left<string, number>('error')

      expect(result.isLeft()).toBe(true)
      expect(result.isRight()).toBe(false)
    })
  })

  describe('right() helper function', () => {
    it('should create a Right instance', () => {
      const result = right(42)

      expect(result).toBeInstanceOf(Right)
      expect(result.value).toBe(42)
    })

    it('should be typed as Either', () => {
      const result = right<number, string>(42)

      expect(result.isLeft()).toBe(false)
      expect(result.isRight()).toBe(true)
    })
  })

  describe('Type Guards', () => {
    it('should narrow type correctly when using isLeft()', () => {
      const result = left<string, number>('error')

      if (result.isLeft()) {
        expect(typeof result.value).toBe('string')
      }
    })

    it('should narrow type correctly when using isRight()', () => {
      const result = right<number, string>(42)

      if (result.isRight()) {
        expect(typeof result.value).toBe('number')
      }
    })
  })
})
