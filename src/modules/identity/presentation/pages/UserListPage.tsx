import React, { useState } from 'react'

import type { IdentityRepository, UserDto } from '../../application/protocols'
import { createIdentityHooks } from '../../infra'

interface UserListPageProps {
  repository: IdentityRepository
}

export function UserListPage({
  repository
}: UserListPageProps): React.JSX.Element {
  const { useUsers, useDeleteUser } = createIdentityHooks(repository)
  const { data: users, isLoading, error } = useUsers()
  const deleteUserMutation = useDeleteUser()

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [roleFilter, setRoleFilter] = useState('ALL')

  const filteredUsers = filterUsers(
    users ?? [],
    searchTerm,
    statusFilter,
    roleFilter
  )

  async function handleDelete(userId: string): Promise<void> {
    await deleteUserMutation.mutateAsync(userId)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading users...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-500">
          Error loading users: {error.message}
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/80"
          type="button"
        >
          New User
        </button>
      </header>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded border px-3 py-2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded border px-3 py-2"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="BLOCKED">Blocked</option>
        </select>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded border px-3 py-2"
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="LIBRARIAN">Librarian</option>
          <option value="PROFESSOR">Professor</option>
          <option value="STUDENT">Student</option>
        </select>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">
                <span
                  className={`rounded px-2 py-1 text-sm ${
                    user.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-800'
                      : user.status === 'BLOCKED'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="p-3">
                <button
                  className="mr-2 rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                  type="button"
                >
                  Edit
                </button>
                <button
                  className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                  type="button"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && (
        <p className="mt-8 text-center text-gray-500">No users found.</p>
      )}
    </div>
  )
}

function filterUsers(
  users: UserDto[],
  searchTerm: string,
  statusFilter: string,
  roleFilter: string
): UserDto[] {
  return users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })
}
