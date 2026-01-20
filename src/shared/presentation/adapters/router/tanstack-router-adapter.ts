import { useNavigate } from '@tanstack/react-router'

import type { Router } from '@/shared/presentation/protocols/router-protocol'

export function useTanStackRouterAdapter(): Router {
  const navigate = useNavigate()

  return {
    navigate: (path: string) => navigate({ to: path })
  }
}
