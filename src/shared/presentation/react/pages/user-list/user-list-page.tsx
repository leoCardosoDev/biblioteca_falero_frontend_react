import { UserListController } from '@/shared/presentation/react/pages/user-list/user-list-controller'
import type {
  LoadUsers,
  AddUser,
  UpdateUser,
  DeleteUser,
  LoadUserById,
  LoadAddressByZipCode,
  LoadCityById,
  LoadStateById,
  LoadNeighborhoodById
} from '@/shared/domain/usecases'
import type { ManageUserAccess } from '@/shared/domain/usecases/manage-user-access'

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
