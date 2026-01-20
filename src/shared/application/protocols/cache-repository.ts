export interface CacheRepository {
  set(key: string, value: string): Promise<void>
  get(key: string): Promise<string | null>
  remove(key: string): Promise<void>
}
