import type { User } from '@/domain/models/user'

export interface LoadUsers {
  perform: () => Promise<User[]>
}
