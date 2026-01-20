import { describe, it, expect } from 'vitest'
import { Address } from '@/modules/geography/domain/value-objects/address'

describe('Address Value Object', () => {
  const validProps = {
    street: 'Rua das Flores',
    number: '123',
    complement: 'Apt 45',
    neighborhood: 'Centro',
    city: 'Campinas',
    state: 'SP',
    zipCode: '13000-000'
  }

  describe('create()', () => {
    it('should create an Address with all required properties', () => {
      const address = Address.create(validProps)

      expect(address.street).toBe('Rua das Flores')
      expect(address.number).toBe('123')
      expect(address.complement).toBe('Apt 45')
      expect(address.neighborhood).toBe('Centro')
      expect(address.city).toBe('Campinas')
      expect(address.state).toBe('SP')
      expect(address.zipCode).toBe('13000-000')
    })

    it('should create an Address without optional complement', () => {
      const propsWithoutComplement = { ...validProps }
      delete propsWithoutComplement.complement

      const address = Address.create(propsWithoutComplement)

      expect(address.complement).toBeUndefined()
    })

    it('should allow optional stateId, cityId, and neighborhoodId', () => {
      const propsWithIds = {
        ...validProps,
        stateId: 'state-123',
        cityId: 'city-456',
        neighborhoodId: 'neighborhood-789'
      }
      const address = Address.create(propsWithIds)

      expect(address.stateId).toBe('state-123')
      expect(address.cityId).toBe('city-456')
      expect(address.neighborhoodId).toBe('neighborhood-789')
    })

    it('should throw when street is missing', () => {
      expect(() => Address.create({ ...validProps, street: '' })).toThrow(
        'Address: missing required properties'
      )
    })

    it('should throw when number is missing', () => {
      expect(() => Address.create({ ...validProps, number: '' })).toThrow(
        'Address: missing required properties'
      )
    })

    it('should throw when neighborhood is missing', () => {
      expect(() => Address.create({ ...validProps, neighborhood: '' })).toThrow(
        'Address: missing required properties'
      )
    })

    it('should throw when city is missing', () => {
      expect(() => Address.create({ ...validProps, city: '' })).toThrow(
        'Address: missing required properties'
      )
    })

    it('should throw when state is missing', () => {
      expect(() => Address.create({ ...validProps, state: '' })).toThrow(
        'Address: missing required properties'
      )
    })

    it('should throw when zipCode is missing', () => {
      expect(() => Address.create({ ...validProps, zipCode: '' })).toThrow(
        'Address: missing required properties'
      )
    })
  })

  describe('immutability', () => {
    it('should return a copy from toPlainObject, not the internal reference', () => {
      const address = Address.create(validProps)
      const plainA = address.toPlainObject()
      const plainB = address.toPlainObject()

      expect(plainA).not.toBe(plainB)
      expect(plainA).toEqual(plainB)
    })
  })

  describe('equals()', () => {
    it('should return true for Addresses with identical structural properties', () => {
      const addressA = Address.create(validProps)
      const addressB = Address.create(validProps)

      expect(addressA.equals(addressB)).toBe(true)
    })

    it('should return false for Addresses with different street', () => {
      const addressA = Address.create(validProps)
      const addressB = Address.create({
        ...validProps,
        street: 'Rua Diferente'
      })

      expect(addressA.equals(addressB)).toBe(false)
    })

    it('should return false for Addresses with different zipCode', () => {
      const addressA = Address.create(validProps)
      const addressB = Address.create({ ...validProps, zipCode: '99999-999' })

      expect(addressA.equals(addressB)).toBe(false)
    })
  })
})
