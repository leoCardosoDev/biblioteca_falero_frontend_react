// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'

import { User } from '@/modules/identity/domain/entities'
import type { UserProps } from '@/modules/identity/domain/entities/user'
import {
  Email,
  Cpf,
  Name,
  UserRole,
  UserStatus,
  Address
} from '@/modules/identity/domain/value-objects'

describe('User Entity', () => {
  function createValidUserProps(): UserProps {
    const emailResult = Email.create('user@example.com')
    const cpfResult = Cpf.create('52998224725')
    const nameResult = Name.create('John Doe')

    if (emailResult.isLeft() || cpfResult.isLeft() || nameResult.isLeft()) {
      throw new Error('Failed to create valid VOs for test')
    }

    return {
      id: 'user-123',
      name: nameResult.value,
      email: emailResult.value,
      rg: '12.345.678-9',
      cpf: cpfResult.value,
      role: UserRole.student(),
      status: UserStatus.active(),
      gender: 'MALE',
      createdAt: new Date('2024-01-01')
    }
  }

  describe('create', () => {
    it('should create a valid User with all required props', () => {
      const props = createValidUserProps()
      const user = User.create(props)

      expect(user.id).toBe('user-123')
      expect(user.name.getValue()).toBe('John Doe')
      expect(user.email.getValue()).toBe('user@example.com')
      expect(user.rg).toBe('12.345.678-9')
      expect(user.cpf.getValue()).toBe('52998224725')
      expect(user.role.getValue()).toBe('STUDENT')
      expect(user.status.getValue()).toBe('ACTIVE')
      expect(user.gender).toBe('MALE')
    })

    it('should throw an error if id is missing', () => {
      const props = { ...createValidUserProps(), id: '' }

      expect(() => User.create(props)).toThrow('User ID is required')
    })

    it('should create User with optional fields', () => {
      const address = Address.create({
        street: 'Test Street',
        number: '100',
        neighborhood: 'Test Neighborhood',
        city: 'Test City',
        state: 'TS',
        zipCode: '12345-678'
      })

      const props = {
        ...createValidUserProps(),
        enrollmentId: 'ENR-001',
        avatarUrl: 'https://example.com/avatar.png',
        address,
        deletedAt: new Date('2024-12-31')
      }
      const user = User.create(props)

      expect(user.enrollmentId).toBe('ENR-001')
      expect(user.avatarUrl).toBe('https://example.com/avatar.png')
      expect(user.address).toBeDefined()
      expect(user.deletedAt).toEqual(new Date('2024-12-31'))
    })
  })

  describe('restore', () => {
    it('should restore a User without validation', () => {
      const props = createValidUserProps()
      const user = User.restore(props)

      expect(user.id).toBe('user-123')
    })
  })

  describe('isAdmin', () => {
    it('should return true if user role is ADMIN', () => {
      const props = { ...createValidUserProps(), role: UserRole.admin() }
      const user = User.create(props)

      expect(user.isAdmin()).toBe(true)
    })

    it('should return false if user role is not ADMIN', () => {
      const props = createValidUserProps()
      const user = User.create(props)

      expect(user.isAdmin()).toBe(false)
    })
  })

  describe('isActive', () => {
    it('should return true if user status is ACTIVE', () => {
      const props = createValidUserProps()
      const user = User.create(props)

      expect(user.isActive()).toBe(true)
    })

    it('should return false if user status is BLOCKED', () => {
      const props = { ...createValidUserProps(), status: UserStatus.blocked() }
      const user = User.create(props)

      expect(user.isActive()).toBe(false)
    })
  })

  describe('isBlocked', () => {
    it('should return true if user status is BLOCKED', () => {
      const props = { ...createValidUserProps(), status: UserStatus.blocked() }
      const user = User.create(props)

      expect(user.isBlocked()).toBe(true)
    })

    it('should return false if user status is ACTIVE', () => {
      const props = createValidUserProps()
      const user = User.create(props)

      expect(user.isBlocked()).toBe(false)
    })
  })

  describe('canEdit', () => {
    it('should return true if user is active and not blocked', () => {
      const props = createValidUserProps()
      const user = User.create(props)

      expect(user.canEdit()).toBe(true)
    })

    it('should return false if user is blocked', () => {
      const props = { ...createValidUserProps(), status: UserStatus.blocked() }
      const user = User.create(props)

      expect(user.canEdit()).toBe(false)
    })
  })

  describe('changeName', () => {
    it('should return a new User instance with the new name', () => {
      const props = createValidUserProps()
      const user = User.create(props)

      const newNameResult = Name.create('Jane Doe')
      if (newNameResult.isLeft()) throw new Error('Invalid name')

      const updatedUser = user.changeName(newNameResult.value)

      expect(updatedUser).not.toBe(user)
      expect(updatedUser.name.getValue()).toBe('Jane Doe')
      expect(user.name.getValue()).toBe('John Doe')
    })
  })

  describe('changeAddress', () => {
    it('should return a new User instance with the new address', () => {
      const props = createValidUserProps()
      const user = User.create(props)

      const newAddress = Address.create({
        street: 'New Street',
        number: '200',
        neighborhood: 'New Neighborhood',
        city: 'New City',
        state: 'NS',
        zipCode: '98765-432'
      })!

      const updatedUser = user.changeAddress(newAddress)

      expect(updatedUser).not.toBe(user)
      expect(updatedUser.address?.street).toBe('New Street')
      expect(user.address).toBeUndefined()
    })
  })

  describe('block', () => {
    it('should return a new User instance with BLOCKED status', () => {
      const props = createValidUserProps()
      const user = User.create(props)

      const blockedUser = user.block()

      expect(blockedUser).not.toBe(user)
      expect(blockedUser.isBlocked()).toBe(true)
      expect(user.isBlocked()).toBe(false)
    })
  })

  describe('activate', () => {
    it('should return a new User instance with ACTIVE status', () => {
      const props = { ...createValidUserProps(), status: UserStatus.blocked() }
      const user = User.create(props)

      const activatedUser = user.activate()

      expect(activatedUser).not.toBe(user)
      expect(activatedUser.isActive()).toBe(true)
      expect(user.isActive()).toBe(false)
    })
  })
})
