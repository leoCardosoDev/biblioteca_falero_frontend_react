import { describe, it, expect } from 'vitest'
import { State } from '@/modules/geography/domain/entities/state'

describe('State Entity', () => {
  const validProps = {
    id: 'state-123',
    name: 'São Paulo',
    abbreviation: 'SP'
  }

  describe('create()', () => {
    it('should create a State with valid properties', () => {
      const state = State.create(validProps)

      expect(state.id).toBe('state-123')
      expect(state.name).toBe('São Paulo')
      expect(state.abbreviation).toBe('SP')
    })

    it('should throw when id is missing', () => {
      expect(() => State.create({ ...validProps, id: '' })).toThrow(
        'State: missing required properties'
      )
    })

    it('should throw when name is missing', () => {
      expect(() => State.create({ ...validProps, name: '' })).toThrow(
        'State: missing required properties'
      )
    })

    it('should throw when abbreviation is missing', () => {
      expect(() => State.create({ ...validProps, abbreviation: '' })).toThrow(
        'State: missing required properties'
      )
    })
  })

  describe('immutability', () => {
    it('should return a copy from toPlainObject, not the internal reference', () => {
      const state = State.create(validProps)
      const plainA = state.toPlainObject()
      const plainB = state.toPlainObject()

      expect(plainA).not.toBe(plainB)
      expect(plainA).toEqual(plainB)
    })
  })

  describe('equals()', () => {
    it('should return true for States with the same id', () => {
      const stateA = State.create(validProps)
      const stateB = State.create({ ...validProps, name: 'Another Name' })

      expect(stateA.equals(stateB)).toBe(true)
    })

    it('should return false for States with different ids', () => {
      const stateA = State.create(validProps)
      const stateB = State.create({ ...validProps, id: 'different-id' })

      expect(stateA.equals(stateB)).toBe(false)
    })
  })
})
