import type { User } from '@/shared/domain/models/user'

export interface LoadUserById {
  perform: (id: string) => Promise<User>
}
