import React from 'react'
import { Users } from '@/presentation/react/pages/user-list/user-list-page'
import { makeRemoteAddUser } from '@/main/factories/usecases/make-remote-add-user'
import { makeRemoteUpdateUser } from '@/main/factories/usecases/make-remote-update-user'
import { makeRemoteDeleteUser } from '@/main/factories/usecases/make-remote-delete-user'
import { makeRemoteAddUserLogin } from '@/main/factories/usecases/make-remote-add-user-login'
import { makeRemoteLoadUserById } from '@/main/factories/usecases/remote-load-user-by-id-factory'
import { makeRemoteLoadAddressByZipCode } from '@/main/factories/usecases/make-remote-load-address-by-zip-code'
import { makeRemoteLoadUsers } from '@/main/factories/usecases/remote-load-users-factory'

export const MakeUserList: React.FC = () => {
  return (
    <Users
      loadUsers={makeRemoteLoadUsers()}
      addUser={makeRemoteAddUser()}
      updateUser={makeRemoteUpdateUser()}
      deleteUser={makeRemoteDeleteUser()}
      addUserLogin={makeRemoteAddUserLogin()}
      loadUserById={makeRemoteLoadUserById()}
      loadAddressByZipCode={makeRemoteLoadAddressByZipCode()}
    />
  )
}
