import { describe, it, expect } from 'vitest'
import { City } from '@/modules/geography/domain/entities/city'

describe('City Entity', () => {
  const validProps = {
    id: 'city-456',
    name: 'Campinas',
    stateId: 'state-123'
  }

  describe('create()', () => {
    it('should create a City with valid properties', () => {
      const city = City.create(validProps)

      expect(city.id).toBe('city-456')
      expect(city.name).toBe('Campinas')
      expect(city.stateId).toBe('state-123')
    })

    it('should throw when id is missing', () => {
      expect(() => City.create({ ...validProps, id: '' })).toThrow(
        'City: missing required properties'
      )
    })

    it('should throw when name is missing', () => {
      expect(() => City.create({ ...validProps, name: '' })).toThrow(
        'City: missing required properties'
      )
    })

    it('should throw when stateId is missing', () => {
      expect(() => City.create({ ...validProps, stateId: '' })).toThrow(
        'City: missing required properties'
      )
    })
  })

  describe('immutability', () => {
    it('should return a copy from toPlainObject, not the internal reference', () => {
      const city = City.create(validProps)
      const plainA = city.toPlainObject()
      const plainB = city.toPlainObject()

      expect(plainA).not.toBe(plainB)
      expect(plainA).toEqual(plainB)
    })
  })

  describe('equals()', () => {
    it('should return true for Cities with the same id', () => {
      const cityA = City.create(validProps)
      const cityB = City.create({ ...validProps, name: 'Different Name' })

      expect(cityA.equals(cityB)).toBe(true)
    })

    it('should return false for Cities with different ids', () => {
      const cityA = City.create(validProps)
      const cityB = City.create({ ...validProps, id: 'different-id' })

      expect(cityA.equals(cityB)).toBe(false)
    })
  })
})
