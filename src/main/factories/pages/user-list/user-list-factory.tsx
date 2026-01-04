import React from 'react';
import { Users } from '@/presentation/react/pages/user-list/user-list-page';
import { DbAddUser } from '@/application/usecases/db-add-user';
import { DbUpdateUser } from '@/application/usecases/db-update-user';
import { DbDeleteUser } from '@/application/usecases/db-delete-user';
import { DbAddUserLogin } from '@/application/usecases/db-add-user-login';
import { HttpUserRepository } from '@/infra/http/http-user-repository';
import { HttpUserLoginRepository } from '@/infra/http/http-user-login-repository';
import { makeRemoteLoadUsers } from '@/main/factories/usecases/remote-load-users-factory';
import { makeRemoteLoadUserById } from '@/main/factories/usecases/remote-load-user-by-id-factory';
import { makeHttpClient } from '../../http/api-client-factory';

export const MakeUserList: React.FC = () => {
  const httpClient = makeHttpClient();

  const userRepository = new HttpUserRepository(httpClient);
  const userLoginRepository = new HttpUserLoginRepository(httpClient);

  const loadUsers = makeRemoteLoadUsers();
  const addUser = new DbAddUser(userRepository);
  const updateUser = new DbUpdateUser(userRepository);
  const deleteUser = new DbDeleteUser(userRepository);
  const addUserLogin = new DbAddUserLogin(userLoginRepository);
  const loadUserById = makeRemoteLoadUserById();

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
