import { describe, it, expect } from 'vitest'
import { Neighborhood } from '@/modules/geography/domain/entities/neighborhood'

describe('Neighborhood Entity', () => {
  const validProps = {
    id: 'neighborhood-789',
    name: 'Centro',
    cityId: 'city-456'
  }

  describe('create()', () => {
    it('should create a Neighborhood with valid properties', () => {
      const neighborhood = Neighborhood.create(validProps)

      expect(neighborhood.id).toBe('neighborhood-789')
      expect(neighborhood.name).toBe('Centro')
      expect(neighborhood.cityId).toBe('city-456')
    })

    it('should throw when id is missing', () => {
      expect(() => Neighborhood.create({ ...validProps, id: '' })).toThrow(
        'Neighborhood: missing required properties'
      )
    })

    it('should throw when name is missing', () => {
      expect(() => Neighborhood.create({ ...validProps, name: '' })).toThrow(
        'Neighborhood: missing required properties'
      )
    })

    it('should throw when cityId is missing', () => {
      expect(() => Neighborhood.create({ ...validProps, cityId: '' })).toThrow(
        'Neighborhood: missing required properties'
      )
    })
  })

  describe('immutability', () => {
    it('should return a copy from toPlainObject, not the internal reference', () => {
      const neighborhood = Neighborhood.create(validProps)
      const plainA = neighborhood.toPlainObject()
      const plainB = neighborhood.toPlainObject()

      expect(plainA).not.toBe(plainB)
      expect(plainA).toEqual(plainB)
    })
  })

  describe('equals()', () => {
    it('should return true for Neighborhoods with the same id', () => {
      const neighborhoodA = Neighborhood.create(validProps)
      const neighborhoodB = Neighborhood.create({
        ...validProps,
        name: 'Different Name'
      })

      expect(neighborhoodA.equals(neighborhoodB)).toBe(true)
    })

    it('should return false for Neighborhoods with different ids', () => {
      const neighborhoodA = Neighborhood.create(validProps)
      const neighborhoodB = Neighborhood.create({
        ...validProps,
        id: 'different-id'
      })

      expect(neighborhoodA.equals(neighborhoodB)).toBe(false)
    })
  })
})
