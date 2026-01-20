import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { createAppStore } from '@/shared/infra/store/adapter'
import type { Session } from '@/shared/infra/store'

const createTestStore = () => createAppStore()

describe('useAppStore', () => {
  afterEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('theme slice', () => {
    it('should have default theme as system', () => {
      const store = createTestStore()
      expect(store.getState().theme).toBe('system')
    })

    it('should update theme when setTheme is called', () => {
      const store = createTestStore()

      act(() => {
        store.getState().setTheme('dark')
      })

      expect(store.getState().theme).toBe('dark')
    })

    it('should allow changing theme multiple times', () => {
      const store = createTestStore()

      act(() => {
        store.getState().setTheme('dark')
      })
      expect(store.getState().theme).toBe('dark')

      act(() => {
        store.getState().setTheme('light')
      })
      expect(store.getState().theme).toBe('light')
    })
  })

  describe('sidebar slice', () => {
    it('should have sidebar closed by default', () => {
      const store = createTestStore()
      expect(store.getState().isOpen).toBe(false)
    })

    it('should toggle sidebar state', () => {
      const store = createTestStore()

      act(() => {
        store.getState().toggleSidebar()
      })

      expect(store.getState().isOpen).toBe(true)

      act(() => {
        store.getState().toggleSidebar()
      })

      expect(store.getState().isOpen).toBe(false)
    })

    it('should set sidebar open state directly', () => {
      const store = createTestStore()

      act(() => {
        store.getState().setSidebarOpen(true)
      })

      expect(store.getState().isOpen).toBe(true)
    })
  })

  describe('session slice', () => {
    it('should have null session by default', () => {
      const store = createTestStore()
      expect(store.getState().session.token).toBeNull()
      expect(store.getState().session.user).toBeNull()
    })

    it('should set session with token and user', () => {
      const store = createTestStore()
      const testSession: Session = {
        token: 'test-token-123',
        user: { id: 'user-1', name: 'Test User' }
      }

      act(() => {
        store.getState().setSession(testSession)
      })

      expect(store.getState().session.token).toBe('test-token-123')
      expect(store.getState().session.user?.id).toBe('user-1')
      expect(store.getState().session.user?.name).toBe('Test User')
    })

    it('should clear session', () => {
      const store = createTestStore()
      const testSession: Session = {
        token: 'test-token',
        user: { id: '1', name: 'User' }
      }

      act(() => {
        store.getState().setSession(testSession)
      })

      act(() => {
        store.getState().clearSession()
      })

      expect(store.getState().session.token).toBeNull()
      expect(store.getState().session.user).toBeNull()
    })
  })

  describe('hook integration', () => {
    it('should work with renderHook', () => {
      const store = createTestStore()
      const { result } = renderHook(() => store((state) => state.theme))

      expect(result.current).toBe('system')
    })

    it('should trigger re-render on state change', () => {
      const store = createTestStore()
      const { result } = renderHook(() => store((state) => state.theme))

      act(() => {
        store.getState().setTheme('dark')
      })

      expect(result.current).toBe('dark')
    })
  })
})
