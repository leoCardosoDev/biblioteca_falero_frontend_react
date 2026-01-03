import { useAuthContext } from '@/presentation/hooks/use-auth-context';
import { Avatar } from '@/presentation/components/ui';
import { formatUserRole } from '@/presentation/helpers/user-serializers';
import { UserModel } from '@/domain/models/user-model';

export const ProfileDisplay: React.FC = () => {
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      <div className="text-right hidden sm:block">
        <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
          {user.name}
        </p>
        <p className="text-xs text-slate-500">
          {formatUserRole(user.role as UserModel['role'])}
        </p>
      </div>
      <Avatar src={user.avatarUrl} />
    </div>
  );
};
