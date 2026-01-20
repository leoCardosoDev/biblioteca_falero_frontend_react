/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { LocalStorageAdapter } from '@/shared/infra/cache/local-storage-adapter'

describe('LocalStorageAdapter', () => {
  let sut: LocalStorageAdapter

  beforeEach(() => {
    sut = new LocalStorageAdapter()
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('set()', () => {
    it('should call localStorage.setItem with correct key and value', async () => {
      const key = 'test-key'
      const value = 'test-value'

      await sut.set(key, value)

      expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    })

    it('should handle empty value', async () => {
      const key = 'empty-key'
      const value = ''

      await sut.set(key, value)

      expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
    })
  })

  describe('get()', () => {
    it('should call localStorage.getItem with correct key', async () => {
      const key = 'test-key'
      vi.mocked(localStorage.getItem).mockReturnValue('stored-value')

      await sut.get(key)

      expect(localStorage.getItem).toHaveBeenCalledWith(key)
      expect(localStorage.getItem).toHaveBeenCalledTimes(1)
    })

    it('should return the stored value', async () => {
      const expectedValue = 'stored-value'
      vi.mocked(localStorage.getItem).mockReturnValue(expectedValue)

      const result = await sut.get('test-key')

      expect(result).toBe(expectedValue)
    })

    it('should return null when key does not exist', async () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null)

      const result = await sut.get('non-existent-key')

      expect(result).toBeNull()
    })
  })

  describe('remove()', () => {
    it('should call localStorage.removeItem with correct key', async () => {
      const key = 'test-key'

      await sut.remove(key)

      expect(localStorage.removeItem).toHaveBeenCalledWith(key)
      expect(localStorage.removeItem).toHaveBeenCalledTimes(1)
    })
  })
})
