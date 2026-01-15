import { useNavigate } from 'react-router-dom'

import type { Router } from '@/presentation/protocols/router-protocol'

export const useReactRouterAdapter = (): Router => {
  const navigate = useNavigate()

  return {
    navigate: (path: string) => navigate(path)
  }
}
