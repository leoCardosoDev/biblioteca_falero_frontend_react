import { describe, it, expect } from 'vitest'

import { queryClient } from '@/shared/infra/query/query-client'

describe('query-client', () => {
  const EXPECTED_STALE_TIME_MS = 5 * 60 * 1000
  const EXPECTED_RETRY_COUNT = 1

  describe('default options', () => {
    it('should have staleTime set to 5 minutes', () => {
      const defaultOptions = queryClient.getDefaultOptions()
      expect(defaultOptions.queries?.staleTime).toBe(EXPECTED_STALE_TIME_MS)
    })

    it('should have retry set to 1', () => {
      const defaultOptions = queryClient.getDefaultOptions()
      expect(defaultOptions.queries?.retry).toBe(EXPECTED_RETRY_COUNT)
    })
  })
})
