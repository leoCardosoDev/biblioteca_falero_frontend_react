import type { CacheRepository } from '@/shared/application/protocols/cache-repository'
import { LocalStorageAdapter } from '@/shared/infra/cache/local-storage-adapter'

export const makeLocalStorageAdapter = (): CacheRepository => {
  return new LocalStorageAdapter()
}
