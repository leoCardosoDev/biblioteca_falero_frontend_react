import React from 'react';
import { Users } from '@/presentation/react/pages/user-list/user-list-page';
import { DbLoadUsers } from '@/application/usecases/db-load-users';
import { DbAddUser } from '@/application/usecases/db-add-user';
import { DbUpdateUser } from '@/application/usecases/db-update-user';
import { DbDeleteUser } from '@/application/usecases/db-delete-user';
import { DbAddUserLogin } from '@/application/usecases/db-add-user-login';
import { DbLoadUserById } from '@/application/usecases/db-load-user-by-id';
import { HttpUserRepository } from '@/infra/http/http-user-repository';
import { HttpUserLoginRepository } from '@/infra/http/http-user-login-repository';
import { makeHttpClient } from '../../http/api-client-factory';

export const MakeUserList: React.FC = () => {
  const httpClient = makeHttpClient();

  const userRepository = new HttpUserRepository(httpClient);
  const userLoginRepository = new HttpUserLoginRepository(httpClient);

  const loadUsers = new DbLoadUsers(userRepository);
  const addUser = new DbAddUser(userRepository);
  const updateUser = new DbUpdateUser(userRepository);
  const deleteUser = new DbDeleteUser(userRepository);
  const addUserLogin = new DbAddUserLogin(userLoginRepository);
  const loadUserById = new DbLoadUserById(userRepository);

  return (
    <Users
      loadUsers={loadUsers}
      addUser={addUser}
      updateUser={updateUser}
      deleteUser={deleteUser}
      addUserLogin={addUserLogin}
      loadUserById={loadUserById}
    />
  );
};
