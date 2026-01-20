import { describe, it, expect } from 'vitest'

describe('Dashboard Module Structure', () => {
  it('should have domain layer with DTOs', async () => {
    const domain = await import('@/modules/dashboard/domain')
    expect(domain).toBeDefined()
  })

  it('should have application layer with protocols only (no React)', async () => {
    const application = await import('@/modules/dashboard/application')
    expect(application).toBeDefined()
  })

  it('should have infra layer with repository and hooks', async () => {
    const infra = await import('@/modules/dashboard/infra')
    expect(infra).toBeDefined()
    expect(infra.MockDashboardRepository).toBeDefined()
    expect(infra.createDashboardFacade).toBeDefined()
    expect(infra.createDashboardHooks).toBeDefined()
  })

  it('should have presentation layer with components and pages', async () => {
    const presentation = await import('@/modules/dashboard/presentation')
    expect(presentation).toBeDefined()
  })

  it('should export public API from module root', async () => {
    const dashboard = await import('@/modules/dashboard')
    expect(dashboard).toBeDefined()
  })
})
