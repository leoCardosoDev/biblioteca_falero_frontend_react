import type { ReactNode } from 'react'
import { RouterProvider } from '@tanstack/react-router'

import { QueryProvider } from '@/shared/infra/query'
import { router } from '@/main/router'

export function App(): ReactNode {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}
