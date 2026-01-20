import { useAuthContext } from '@/shared/presentation/react/hooks/use-auth-context'
import { Avatar } from '@/shared/presentation/react/components/ui'
import { formatUserRole } from '@/shared/presentation/react/helpers/user-serializers'
import type { User } from '@/shared/domain/models/user'

export function ProfileDisplay() {
  const { user } = useAuthContext()

  if (!user) {
    return null
  }

  return (
    <div className="group flex cursor-pointer items-center gap-3">
      <div className="hidden text-right sm:block">
        <p className="text-sm font-semibold text-white transition-colors group-hover:text-primary">
          {user.name}
        </p>
        <p className="text-xs text-slate-500">
          {formatUserRole(user.role as User['role'])}
        </p>
      </div>
      <Avatar src={user.avatarUrl} />
    </div>
  )
}
