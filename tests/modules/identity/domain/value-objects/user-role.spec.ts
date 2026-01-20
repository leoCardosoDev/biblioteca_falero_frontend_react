// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'

import { UserRole } from '@/modules/identity/domain/value-objects'

describe('UserRole Value Object', () => {
  describe('create', () => {
    it('should create UserRole for ADMIN', () => {
      const role = UserRole.create('ADMIN')

      expect(role).toBeDefined()
      expect(role?.getValue()).toBe('ADMIN')
    })

    it('should create UserRole for LIBRARIAN', () => {
      const role = UserRole.create('LIBRARIAN')

      expect(role).toBeDefined()
      expect(role?.getValue()).toBe('LIBRARIAN')
    })

    it('should create UserRole for PROFESSOR', () => {
      const role = UserRole.create('PROFESSOR')

      expect(role).toBeDefined()
      expect(role?.getValue()).toBe('PROFESSOR')
    })

    it('should create UserRole for STUDENT', () => {
      const role = UserRole.create('STUDENT')

      expect(role).toBeDefined()
      expect(role?.getValue()).toBe('STUDENT')
    })

    it('should return undefined for invalid role', () => {
      const role = UserRole.create('INVALID_ROLE')

      expect(role).toBeUndefined()
    })
  })

  describe('static factory methods', () => {
    it('should create admin role via static method', () => {
      const role = UserRole.admin()

      expect(role.isAdmin()).toBe(true)
      expect(role.getValue()).toBe('ADMIN')
    })

    it('should create librarian role via static method', () => {
      const role = UserRole.librarian()

      expect(role.isLibrarian()).toBe(true)
      expect(role.getValue()).toBe('LIBRARIAN')
    })

    it('should create professor role via static method', () => {
      const role = UserRole.professor()

      expect(role.getValue()).toBe('PROFESSOR')
    })

    it('should create student role via static method', () => {
      const role = UserRole.student()

      expect(role.getValue()).toBe('STUDENT')
    })
  })

  describe('isAdmin', () => {
    it('should return true for admin role', () => {
      const role = UserRole.admin()

      expect(role.isAdmin()).toBe(true)
    })

    it('should return false for non-admin role', () => {
      const role = UserRole.student()

      expect(role.isAdmin()).toBe(false)
    })
  })

  describe('equals', () => {
    it('should return true for two roles with the same value', () => {
      const role1 = UserRole.admin()
      const role2 = UserRole.admin()

      expect(role1.equals(role2)).toBe(true)
    })

    it('should return false for two roles with different values', () => {
      const role1 = UserRole.admin()
      const role2 = UserRole.student()

      expect(role1.equals(role2)).toBe(false)
    })
  })
})
