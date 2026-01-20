// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'

import { Address } from '@/modules/identity/domain/value-objects'
import type { AddressProps } from '@/modules/identity/domain/value-objects/address'

describe('Address Value Object', () => {
  function createValidAddressProps(): AddressProps {
    return {
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    }
  }

  describe('create', () => {
    it('should create a valid Address with all required fields', () => {
      const props = createValidAddressProps()
      const address = Address.create(props)

      expect(address).toBeDefined()
      expect(address?.street).toBe('Rua das Flores')
      expect(address?.number).toBe('123')
      expect(address?.neighborhood).toBe('Centro')
      expect(address?.city).toBe('São Paulo')
      expect(address?.state).toBe('SP')
      expect(address?.zipCode).toBe('01234-567')
    })

    it('should create Address with optional complement', () => {
      const props = { ...createValidAddressProps(), complement: 'Apt 101' }
      const address = Address.create(props)

      expect(address).toBeDefined()
      expect(address?.complement).toBe('Apt 101')
    })

    it('should create Address with optional IDs', () => {
      const props = {
        ...createValidAddressProps(),
        stateId: 'state-123',
        cityId: 'city-456',
        neighborhoodId: 'neighborhood-789'
      }
      const address = Address.create(props)

      expect(address).toBeDefined()
      expect(address?.stateId).toBe('state-123')
      expect(address?.cityId).toBe('city-456')
      expect(address?.neighborhoodId).toBe('neighborhood-789')
    })

    it('should return undefined if street is missing', () => {
      const props = { ...createValidAddressProps(), street: '' }
      const address = Address.create(props)

      expect(address).toBeUndefined()
    })

    it('should return undefined if number is missing', () => {
      const props = { ...createValidAddressProps(), number: '' }
      const address = Address.create(props)

      expect(address).toBeUndefined()
    })

    it('should return undefined if neighborhood is missing', () => {
      const props = { ...createValidAddressProps(), neighborhood: '' }
      const address = Address.create(props)

      expect(address).toBeUndefined()
    })

    it('should return undefined if city is missing', () => {
      const props = { ...createValidAddressProps(), city: '' }
      const address = Address.create(props)

      expect(address).toBeUndefined()
    })

    it('should return undefined if state is missing', () => {
      const props = { ...createValidAddressProps(), state: '' }
      const address = Address.create(props)

      expect(address).toBeUndefined()
    })

    it('should return undefined if zipCode is missing', () => {
      const props = { ...createValidAddressProps(), zipCode: '' }
      const address = Address.create(props)

      expect(address).toBeUndefined()
    })
  })

  describe('toPlainObject', () => {
    it('should return a plain object representation', () => {
      const props = createValidAddressProps()
      const address = Address.create(props)

      expect(address?.toPlainObject()).toEqual(props)
    })
  })

  describe('equals', () => {
    it('should return true for two addresses with the same values', () => {
      const address1 = Address.create(createValidAddressProps())
      const address2 = Address.create(createValidAddressProps())

      expect(address1?.equals(address2!)).toBe(true)
    })

    it('should return false for addresses with different streets', () => {
      const address1 = Address.create(createValidAddressProps())
      const address2 = Address.create({
        ...createValidAddressProps(),
        street: 'Rua Diferente'
      })

      expect(address1?.equals(address2!)).toBe(false)
    })
  })
})
