import { describe, test, expect } from 'vitest';
import type { User } from '@/domain/models/user';
import { formatUserRole, getUserRoleColor, formatUserStatus, getUserStatusColor, formatEnrollmentId, formatCpf } from '@/presentation/react/helpers/user-serializers';

describe('User Serializers', () => {
  describe('formatUserRole', () => {
    test('should return correct label for known roles', () => {
      expect(formatUserRole('ADMIN')).toBe('Administrador');
      expect(formatUserRole('LIBRARIAN')).toBe('Bibliotecário');
      expect(formatUserRole('PROFESSOR')).toBe('Professor');
      expect(formatUserRole('STUDENT')).toBe('Estudante');
    });

    test('should return "Desconhecido" if role is falsy', () => {
      expect(formatUserRole(null as unknown as User['role'])).toBe('Desconhecido');
      expect(formatUserRole(undefined as unknown as User['role'])).toBe('Desconhecido');
    });

    test('should return the role itself if unknown', () => {
      expect(formatUserRole('CUSTOM_ROLE' as unknown as User['role'])).toBe('CUSTOM_ROLE');
    });
  });

  describe('getUserRoleColor', () => {
    test('should return correct color for known roles', () => {
      expect(getUserRoleColor('PROFESSOR')).toBe('purple');
      expect(getUserRoleColor('LIBRARIAN')).toBe('warning');
      expect(getUserRoleColor('ADMIN')).toBe('success');
      expect(getUserRoleColor('STUDENT')).toBe('cyan');
    });

    test('should return "neutral" for unknown roles', () => {
      expect(getUserRoleColor('UNKNOWN' as unknown as User['role'])).toBe('neutral');
      expect(getUserRoleColor('UNKNOWN' as unknown as User['role'])).toBe('neutral');
    });
  });

  describe('formatUserStatus', () => {
    test('should return correct label for known statuses', () => {
      expect(formatUserStatus('ACTIVE')).toBe('Ativo');
      expect(formatUserStatus('INACTIVE')).toBe('Inativo');
      expect(formatUserStatus('BLOCKED')).toBe('Bloqueado');
    });

    test('should return status itself if unknown', () => {
      expect(formatUserStatus('UNKNOWN' as unknown as User['status'])).toBe('UNKNOWN');
    });
  });

  describe('getUserStatusColor', () => {
    test('should return "success" for ACTIVE', () => {
      expect(getUserStatusColor('ACTIVE')).toBe('success');
    });

    test('should return "danger" for other statuses', () => {
      expect(getUserStatusColor('INACTIVE')).toBe('danger');
      expect(getUserStatusColor('BLOCKED')).toBe('danger');
      expect(getUserStatusColor('UNKNOWN' as unknown as User['status'])).toBe('danger');
    });
  });

  describe('formatEnrollmentId', () => {
    test('should return enrollmentId if present', () => {
      expect(formatEnrollmentId('12345')).toBe('12345');
    });

    test('should return "-" if enrollmentId is missing', () => {
      expect(formatEnrollmentId(undefined)).toBe('-');
      expect(formatEnrollmentId(null as unknown as string)).toBe('-');
      expect(formatEnrollmentId('')).toBe('-');
    });
  });

  describe('formatCpf', () => {
    test('should return formatted CPF', () => {
      expect(formatCpf('12345678900')).toBe('123.456.789-00');
    });

    test('should return "-" if cpf is missing', () => {
      expect(formatCpf(undefined)).toBe('-');
      expect(formatCpf(null as unknown as string)).toBe('-');
      expect(formatCpf('')).toBe('-');
    });

    test('should handle already formatted or messy inputs gracefully', () => {
      expect(formatCpf('123.456.789-00')).toBe('123.456.789-00');
      // Cleaned: '12345678900', then regex replaces it
      expect(formatCpf('12345678900abc')).toBe('123.456.789-00');
    });
  });
});
