import { useMemo } from 'react'
import type { User } from '@/shared/domain/models'

export interface UseUserFilterProps {
  users: User[]
  searchTerm: string
  statusFilter: string
  roleFilter: string
}

export function useUserFilter({
  users,
  searchTerm,
  statusFilter,
  roleFilter
}: UseUserFilterProps) {
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.cpf && user.cpf.includes(searchTerm)) ||
        (user.enrollmentId && user.enrollmentId.includes(searchTerm))

      const matchesStatus =
        statusFilter === 'ALL' || user.status === statusFilter
      const matchesRole = roleFilter === 'ALL' || user.role === roleFilter

      return matchesSearch && matchesStatus && matchesRole
    })
  }, [users, searchTerm, statusFilter, roleFilter])

  return filteredUsers
}
