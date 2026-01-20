import type { User } from '@/shared/domain/models/user'

export interface LoadUsers {
  perform: () => Promise<User[]>
}
