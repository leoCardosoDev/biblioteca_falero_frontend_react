import { UserListController } from '@/presentation/react/pages/user-list/user-list-controller'
import {
  LoadUsers,
  AddUser,
  UpdateUser,
  DeleteUser,
  LoadUserById,
  LoadAddressByZipCode,
  LoadCityById,
  LoadStateById,
  LoadNeighborhoodById
} from '@/domain/usecases'
import { ManageUserAccess } from '@/domain/usecases/manage-user-access'

interface UsersProps {
  loadUsers: LoadUsers
  addUser: AddUser
  updateUser: UpdateUser
  deleteUser: DeleteUser

  loadUserById: LoadUserById
  loadAddressByZipCode: LoadAddressByZipCode
  loadCityById: LoadCityById
  loadStateById: LoadStateById
  loadNeighborhoodById: LoadNeighborhoodById
  manageUserAccess: ManageUserAccess
}

export function Users(props: UsersProps) {
  return <UserListController {...props} />
}
