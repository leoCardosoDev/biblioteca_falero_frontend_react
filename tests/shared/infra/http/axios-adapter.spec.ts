import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { apiClient } from '@/shared/infra/http/axios-adapter'

describe('axios-adapter', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn()
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  describe('apiClient configuration', () => {
    it('should have baseURL from environment variable', () => {
      const baseUrl = import.meta.env.VITE_API_URL
      // Accessing the private client via helper for testing
      const axiosInstance = apiClient.getClient()
      expect(axiosInstance.defaults.baseURL).toBe(baseUrl)
    })

    it('should have request interceptors configured', () => {
      expect(apiClient.getClient().interceptors.request).toBeDefined()
    })

    it('should have response interceptors configured', () => {
      expect(apiClient.getClient().interceptors.response).toBeDefined()
    })
  })

  describe('request interceptor', () => {
    it('should attach Authorization header when token exists', async () => {
      const mockToken = 'test-token-123'
      vi.mocked(localStorage.getItem).mockReturnValue(mockToken)

      // We need to access the interceptor handler directly to test it without making real requests
      // This is a bit hacky but ensures we test the logic isolation
      // @ts-expect-error - handlers is private/internal
      const handlers = apiClient.getClient().interceptors.request.handlers
      const requestInterceptor = handlers[0]

      const config = await requestInterceptor.fulfilled({
        headers: {}
      })

      expect(config.headers.Authorization).toBe(`Bearer ${mockToken}`)
    })

    it('should not attach Authorization header when token does not exist', async () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null)

      // @ts-expect-error - handlers is private/internal
      const handlers = apiClient.getClient().interceptors.request.handlers
      const requestInterceptor = handlers[0]

      const config = await requestInterceptor.fulfilled({
        headers: {}
      })

      expect(config.headers.Authorization).toBeUndefined()
    })
  })
})
