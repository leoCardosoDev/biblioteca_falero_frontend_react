import { User } from '@/domain/models/user'

export interface LoadUserById {
  perform: (id: string) => Promise<User>
}
