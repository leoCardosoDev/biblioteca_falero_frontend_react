// @vitest-environment jsdom
import { renderHook } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { useUserFilter } from '@/shared/presentation/react/hooks/use-user-filter'
import type { User } from '@/shared/domain/models'

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'STUDENT',
    status: 'ACTIVE',
    cpf: '12345678900',
    enrollmentId: '2023001',
    rg: '1234567',
    gender: 'MALE',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'PROFESSOR',
    status: 'INACTIVE',
    cpf: '98765432100',
    rg: '7654321',
    gender: 'FEMALE',
    createdAt: new Date().toISOString()
  }
]

describe('useUserFilter', () => {
  test('Should return all users if no filter is applied', () => {
    const { result } = renderHook(() =>
      useUserFilter({
        users: mockUsers,
        searchTerm: '',
        statusFilter: 'ALL',
        roleFilter: 'ALL'
      })
    )
    expect(result.current).toEqual(mockUsers)
  })

  test('Should filter by name (case insensitive)', () => {
    const { result } = renderHook(() =>
      useUserFilter({
        users: mockUsers,
        searchTerm: 'john',
        statusFilter: 'ALL',
        roleFilter: 'ALL'
      })
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].id).toBe('1')
  })

  test('Should filter by email', () => {
    const { result } = renderHook(() =>
      useUserFilter({
        users: mockUsers,
        searchTerm: 'jane@example.com',
        statusFilter: 'ALL',
        roleFilter: 'ALL'
      })
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].id).toBe('2')
  })

  test('Should filter by cpf', () => {
    const { result } = renderHook(() =>
      useUserFilter({
        users: mockUsers,
        searchTerm: '12345678900',
        statusFilter: 'ALL',
        roleFilter: 'ALL'
      })
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].id).toBe('1')
  })

  test('Should filter by enrollmentId', () => {
    const { result } = renderHook(() =>
      useUserFilter({
        users: mockUsers,
        searchTerm: '2023001',
        statusFilter: 'ALL',
        roleFilter: 'ALL'
      })
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].id).toBe('1')
  })

  test('Should filter by status', () => {
    const { result } = renderHook(() =>
      useUserFilter({
        users: mockUsers,
        searchTerm: '',
        statusFilter: 'ACTIVE',
        roleFilter: 'ALL'
      })
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].id).toBe('1')
  })

  test('Should filter by role', () => {
    const { result } = renderHook(() =>
      useUserFilter({
        users: mockUsers,
        searchTerm: '',
        statusFilter: 'ALL',
        roleFilter: 'PROFESSOR'
      })
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].id).toBe('2')
  })

  test('Should combine filters', () => {
    const { result } = renderHook(() =>
      useUserFilter({
        users: mockUsers,
        searchTerm: 'john',
        statusFilter: 'ACTIVE',
        roleFilter: 'STUDENT'
      })
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].id).toBe('1')
  })

  test('Should return empty if no match', () => {
    const { result } = renderHook(() =>
      useUserFilter({
        users: mockUsers,
        searchTerm: 'xyz',
        statusFilter: 'ALL',
        roleFilter: 'ALL'
      })
    )
    expect(result.current).toHaveLength(0)
  })
})
