import React from 'react'
import { Users } from '@/presentation/react/pages/user-list/user-list-page'
import { makeRemoteAddUser } from '@/main/factories/usecases/make-remote-add-user'
import { makeRemoteUpdateUser } from '@/main/factories/usecases/make-remote-update-user'
import { makeRemoteDeleteUser } from '@/main/factories/usecases/make-remote-delete-user'
import { makeRemoteAddUserLogin } from '@/main/factories/usecases/make-remote-add-user-login'
import { makeRemoteLoadUserById } from '@/main/factories/usecases/make-remote-load-user-by-id'
import { makeRemoteLoadAddressByZipCode } from '@/main/factories/usecases/make-remote-load-address-by-zip-code'
import { makeRemoteLoadUsers } from '@/main/factories/usecases/make-remote-load-users'
import { makeRemoteLoadCityById } from '@/main/factories/usecases/make-remote-load-city-by-id'
import { makeRemoteLoadStateById } from '@/main/factories/usecases/make-remote-load-state-by-id'
import { makeRemoteLoadNeighborhoodById } from '@/main/factories/usecases/make-remote-load-neighborhood-by-id'

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
      loadCityById={makeRemoteLoadCityById()}
      loadStateById={makeRemoteLoadStateById()}
      loadNeighborhoodById={makeRemoteLoadNeighborhoodById()}
    />
  )
}
