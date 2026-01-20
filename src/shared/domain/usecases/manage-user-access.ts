import type { UserStatus } from '@/shared/domain/models/user'

export interface ManageUserAccessParams {
  id: string
  role?: string
  status?: UserStatus
  password?: string
}

export interface ManageUserAccess {
  perform: (params: ManageUserAccessParams) => Promise<void>
}
