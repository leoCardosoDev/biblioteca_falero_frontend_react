import { QueryClient } from '@tanstack/react-query'

const STALE_TIME_MS = 5 * 60 * 1000
const RETRY_COUNT = 1
const IS_PRODUCTION = import.meta.env.PROD

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_MS,
      retry: RETRY_COUNT,
      refetchOnWindowFocus: IS_PRODUCTION
    }
  }
})
