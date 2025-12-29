import React from 'react';
import axios from 'axios';
import { Users } from '@/presentation/pages/user-list/user-list-page';
import { DbLoadUsers } from '@/application/usecases/db-load-users';
import { DbAddUser } from '@/application/usecases/db-add-user';
import { DbUpdateUser } from '@/application/usecases/db-update-user';
import { DbDeleteUser } from '@/application/usecases/db-delete-user';
import { DbAddUserLogin } from '@/application/usecases/db-add-user-login';
import { HttpUserRepository } from '@/infra/http/http-user-repository';
import { HttpUserLoginRepository } from '@/infra/http/http-user-login-repository';

export const MakeUserList: React.FC = () => {
  // In a real app, use env var
  const httpClient = axios.create({
    baseURL: 'http://localhost:3000/api' // Adjust as needed
  });

  const userRepository = new HttpUserRepository(httpClient);
  const userLoginRepository = new HttpUserLoginRepository(httpClient);

  const loadUsers = new DbLoadUsers(userRepository);
  const addUser = new DbAddUser(userRepository);
  const updateUser = new DbUpdateUser(userRepository);
  const deleteUser = new DbDeleteUser(userRepository);
  const addUserLogin = new DbAddUserLogin(userLoginRepository);

  return (
    <Users
      loadUsers={loadUsers}
      addUser={addUser}
      updateUser={updateUser}
      deleteUser={deleteUser}
      addUserLogin={addUserLogin}
    />
  );
};
