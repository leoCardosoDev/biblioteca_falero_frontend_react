import { CacheRepository } from '@/application/protocols/cache-repository'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

export const makeLocalStorageAdapter = (): CacheRepository => {
  return new LocalStorageAdapter()
}
