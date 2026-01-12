import { UserListController } from '@/presentation/react/pages/user-list/user-list-controller'
import {
  LoadUsers,
  AddUser,
  UpdateUser,
  DeleteUser,
  AddUserLogin,
  LoadUserById,
  LoadAddressByZipCode,
  LoadCityById,
  LoadStateById,
  LoadNeighborhoodById
} from '@/domain/usecases'

interface UsersProps {
  loadUsers: LoadUsers
  addUser: AddUser
  updateUser: UpdateUser
  deleteUser: DeleteUser
  addUserLogin: AddUserLogin
  loadUserById: LoadUserById
  loadAddressByZipCode: LoadAddressByZipCode
  loadCityById: LoadCityById
  loadStateById: LoadStateById
  loadNeighborhoodById: LoadNeighborhoodById
}

export function Users(props: UsersProps) {
  return <UserListController {...props} />
}
