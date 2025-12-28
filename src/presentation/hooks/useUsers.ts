import { useState, useEffect, useCallback, useMemo } from 'react';
import type { User } from '../../domain/entities/User';
import { HttpUserRepository } from '../../infrastructure/api/HttpUserRepository';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Memoize repository to stable reference
  // In a real app, this should be injected via Context or a custom hook
  const userRepository = useMemo(() => new HttpUserRepository(), []);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const data = await userRepository.list();
      console.log('useUsers: loaded data', data);
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('useUsers: data is not an array', data);
        setUsers([]);
      }
    } catch (err) {
      console.error('useUsers: error loading users', err);
      setError('Falha ao carregar usuários');
    } finally {
      setLoading(false);
    }
  }, [userRepository]);


  const createUser = async (user: Omit<User, 'id'>) => {
    setLoading(true);
    setError(undefined);
    try {
      await userRepository.create(user);
      await loadUsers();
    } catch (err) {
      setError('Falha ao criar usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (user: User) => {
    setLoading(true);
    setError(undefined);
    try {
      await userRepository.update(user);
      await loadUsers();
    } catch (err) {
      setError('Falha ao atualizar usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    setError(undefined);
    try {
      await userRepository.delete(id);
      await loadUsers();
    } catch (err) {
      setError('Falha ao excluir usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return { users, loading, error, loadUsers, createUser, updateUser, deleteUser };
};
