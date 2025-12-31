import { UserModel } from '@/domain/models/user-model';

export const formatUserRole = (role: UserModel['role']): string => {
  const roleMap: Record<UserModel['role'], string> = {
    admin: 'Administrador',
    librarian: 'Bibliotecário',
    professor: 'Professor',
  };
  return roleMap[role] || role;
};

export const getUserRoleColor = (role: UserModel['role']): 'primary' | 'success' | 'warning' | 'neutral' | 'danger' => {
  const colorMap: Record<UserModel['role'], 'primary' | 'success' | 'warning' | 'neutral' | 'danger'> = {
    professor: 'primary',
    librarian: 'warning',
    admin: 'success',
  };
  return colorMap[role] || 'neutral';
};

export const formatUserStatus = (status: UserModel['status']): string => {
  return (status as string)?.toLowerCase() === 'active' ? 'Ativo' : 'Inativo';
};

export const getUserStatusColor = (status: UserModel['status']): 'success' | 'danger' => {
  return (status as string)?.toLowerCase() === 'active' ? 'success' : 'danger';
};

export const formatEnrollmentId = (enrollmentId?: string): string => {
  return enrollmentId || '-';
};
