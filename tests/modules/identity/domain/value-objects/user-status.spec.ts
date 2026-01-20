// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'

import { UserStatus } from '@/modules/identity/domain/value-objects'

describe('UserStatus Value Object', () => {
  describe('create', () => {
    it('should create UserStatus for ACTIVE', () => {
      const status = UserStatus.create('ACTIVE')

      expect(status).toBeDefined()
      expect(status?.getValue()).toBe('ACTIVE')
    })

    it('should create UserStatus for INACTIVE', () => {
      const status = UserStatus.create('INACTIVE')

      expect(status).toBeDefined()
      expect(status?.getValue()).toBe('INACTIVE')
    })

    it('should create UserStatus for BLOCKED', () => {
      const status = UserStatus.create('BLOCKED')

      expect(status).toBeDefined()
      expect(status?.getValue()).toBe('BLOCKED')
    })

    it('should return undefined for invalid status', () => {
      const status = UserStatus.create('INVALID_STATUS')

      expect(status).toBeUndefined()
    })
  })

  describe('static factory methods', () => {
    it('should create active status via static method', () => {
      const status = UserStatus.active()

      expect(status.isActive()).toBe(true)
      expect(status.getValue()).toBe('ACTIVE')
    })

    it('should create inactive status via static method', () => {
      const status = UserStatus.inactive()

      expect(status.getValue()).toBe('INACTIVE')
    })

    it('should create blocked status via static method', () => {
      const status = UserStatus.blocked()

      expect(status.isBlocked()).toBe(true)
      expect(status.getValue()).toBe('BLOCKED')
    })
  })

  describe('isActive', () => {
    it('should return true for active status', () => {
      const status = UserStatus.active()

      expect(status.isActive()).toBe(true)
    })

    it('should return false for inactive status', () => {
      const status = UserStatus.inactive()

      expect(status.isActive()).toBe(false)
    })

    it('should return false for blocked status', () => {
      const status = UserStatus.blocked()

      expect(status.isActive()).toBe(false)
    })
  })

  describe('isBlocked', () => {
    it('should return true for blocked status', () => {
      const status = UserStatus.blocked()

      expect(status.isBlocked()).toBe(true)
    })

    it('should return false for active status', () => {
      const status = UserStatus.active()

      expect(status.isBlocked()).toBe(false)
    })
  })

  describe('equals', () => {
    it('should return true for two statuses with the same value', () => {
      const status1 = UserStatus.active()
      const status2 = UserStatus.active()

      expect(status1.equals(status2)).toBe(true)
    })

    it('should return false for two statuses with different values', () => {
      const status1 = UserStatus.active()
      const status2 = UserStatus.blocked()

      expect(status1.equals(status2)).toBe(false)
    })
  })
})
