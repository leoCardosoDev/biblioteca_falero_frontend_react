// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'

import { Cpf } from '@/modules/identity/domain/value-objects'
import { InvalidCpfError } from '@/modules/identity/domain/errors'

describe('Cpf Value Object', () => {
  describe('create', () => {
    it('should create a valid Cpf for a correct CPF number', () => {
      const result = Cpf.create('529.982.247-25')

      expect(result.isRight()).toBe(true)
      if (result.isRight()) {
        expect(result.value.getValue()).toBe('52998224725')
      }
    })

    it('should create a valid Cpf for unformatted valid CPF', () => {
      const result = Cpf.create('52998224725')

      expect(result.isRight()).toBe(true)
    })

    it('should return InvalidCpfError for an invalid CPF number', () => {
      const result = Cpf.create('12345678900')

      expect(result.isLeft()).toBe(true)
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(InvalidCpfError)
      }
    })

    it('should return InvalidCpfError for CPF with all same digits', () => {
      const result = Cpf.create('11111111111')

      expect(result.isLeft()).toBe(true)
    })

    it('should return InvalidCpfError for CPF with wrong length', () => {
      const result = Cpf.create('123456789')

      expect(result.isLeft()).toBe(true)
    })
  })

  describe('getFormatted', () => {
    it('should return formatted CPF string', () => {
      const result = Cpf.create('52998224725')

      if (result.isRight()) {
        expect(result.value.getFormatted()).toBe('529.982.247-25')
      } else {
        throw new Error('Expected valid CPF')
      }
    })
  })

  describe('equals', () => {
    it('should return true for two CPFs with the same value', () => {
      const cpf1Result = Cpf.create('52998224725')
      const cpf2Result = Cpf.create('529.982.247-25')

      if (cpf1Result.isRight() && cpf2Result.isRight()) {
        expect(cpf1Result.value.equals(cpf2Result.value)).toBe(true)
      } else {
        throw new Error('Expected valid CPFs')
      }
    })
  })
})
