import { describe, test, expect } from 'vitest'
import { maskCpf, maskRg, maskZipCode, maskBirthDate } from '@/presentation/helpers/mask-utils'

describe('MaskUtils', () => {
  describe('maskCpf', () => {
    test('Should format CPF correctly', () => {
      expect(maskCpf('12345678901')).toBe('123.456.789-01')
    })

    test('Should handle partial CPF', () => {
      expect(maskCpf('123456')).toBe('123.456')
    })

    test('Should remove non-numeric characters', () => {
      expect(maskCpf('123.456.789-01')).toBe('123.456.789-01')
      expect(maskCpf('123a456b')).toBe('123.456')
    })
  })

  describe('maskRg', () => {
    test('Should format RG correctly', () => {
      // RG format varies by state, but a common one is 00.000.000-0 or 00.000.000-X
      expect(maskRg('123456789')).toBe('12.345.678-9')
    })
  })

  describe('maskZipCode', () => {
    test('Should format ZipCode correctly', () => {
      expect(maskZipCode('12345678')).toBe('12345-678')
    })

    test('Should handle partial ZipCode', () => {
      expect(maskZipCode('12345')).toBe('12345')
    })
  })

  describe('maskBirthDate', () => {
    test('Should format BirthDate correctly', () => {
      expect(maskBirthDate('01012000')).toBe('01/01/2000')
    })

    test('Should handle partial BirthDate', () => {
      expect(maskBirthDate('0101')).toBe('01/01')
    })
  })
})
