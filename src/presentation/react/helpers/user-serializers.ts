import { User } from '@/domain/models/user'

export const formatUserRole = (role: User['role']): string => {
  if (!role) return 'Desconhecido'
  const roleMap: Record<User['role'], string> = {
    ADMIN: 'Administrador',
    LIBRARIAN: 'Bibliotecário',
    PROFESSOR: 'Professor',
    STUDENT: 'Estudante'
  }
  return roleMap[role] || role
}

export const getUserRoleColor = (
  role: User['role']
):
  | 'primary'
  | 'success'
  | 'warning'
  | 'neutral'
  | 'danger'
  | 'purple'
  | 'cyan' => {
  const colorMap: Record<
    User['role'],
    'primary' | 'success' | 'warning' | 'neutral' | 'danger' | 'purple' | 'cyan'
  > = {
    PROFESSOR: 'purple',
    LIBRARIAN: 'warning',
    ADMIN: 'success',
    STUDENT: 'cyan'
  }
  return colorMap[role] || 'neutral'
}

export const formatUserStatus = (status: User['status']): string => {
  const statusMap: Record<User['status'], string> = {
    ACTIVE: 'Ativo',
    INACTIVE: 'Inativo',
    BLOCKED: 'Bloqueado'
  }
  return statusMap[status] || status
}

export const getUserStatusColor = (
  status: User['status']
): 'success' | 'danger' | 'warning' => {
  if (status === 'ACTIVE') return 'success'
  if (status === 'BLOCKED') return 'danger'
  return 'warning'
}

export const formatEnrollmentId = (enrollmentId?: string): string => {
  return enrollmentId || '-'
}

export const formatCpf = (cpf?: string): string => {
  if (!cpf) return '-'
  const cleanCpf = cpf.replace(/\D/g, '')
  return cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}
