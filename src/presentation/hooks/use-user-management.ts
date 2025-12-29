import { useState, useCallback, useEffect } from 'react';
import { UserModel } from '../../domain/models/user-model';
import { LoadUsers } from '../../domain/usecases/load-users';
import { AddUser, AddUserParams } from '../../domain/usecases/add-user';
import { UpdateUser, UpdateUserParams } from '../../domain/usecases/update-user';
import { DeleteUser } from '../../domain/usecases/delete-user';

export interface UseUserManagementProps {
  loadUsers: LoadUsers;
  addUser: AddUser;
  updateUser: UpdateUser;
  deleteUser: DeleteUser;
}

export const useUserManagement = ({ loadUsers, addUser, updateUser, deleteUser }: UseUserManagementProps) => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loadUsers.perform();
      setUsers(data);
    } catch (_err) {
      setError('Erro ao carregar usuários.');
    } finally {
      setIsLoading(false);
    }
  }, [loadUsers]);

  const handleAddUser = async (params: AddUserParams) => {
    try {
      await addUser.perform(params);
      await fetchUsers();
      return true;
    } catch (_err) {
      setError('Erro ao criar usuário.');
      return false;
    }
  };

  const handleUpdateUser = async (params: UpdateUserParams) => {
    try {
      await updateUser.perform(params);
      await fetchUsers();
      return true;
    } catch (_err) {
      setError('Erro ao atualizar usuário.');
      return false;
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser.perform(id);
      await fetchUsers();
      return true;
    } catch (_err) {
      setError('Erro ao excluir usuário.');
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    error,
    fetchUsers,
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
  };
};
