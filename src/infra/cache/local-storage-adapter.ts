import { CacheRepository } from '@/application/protocols/cache-repository'

export class LocalStorageAdapter implements CacheRepository {
  async set(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value)
  }

  async get(key: string): Promise<string | null> {
    return localStorage.getItem(key)
  }
}
