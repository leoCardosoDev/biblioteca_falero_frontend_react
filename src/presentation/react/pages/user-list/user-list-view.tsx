import { User } from '@/domain/models'
import {
  Button,
  Card,
  Icon,
  Avatar,
  Badge,
  Modal
} from '@/presentation/react/components/ui'
import { UserForm, UserFormData } from '@/presentation/react/components/forms'
import {
  CredentialModal,
  CredentialFormData
} from '@/presentation/react/components/credential-modal/credential-modal'
import {
  formatUserRole,
  getUserRoleColor,
  formatUserStatus,
  formatEnrollmentId,
  formatCpf
} from '@/presentation/react/helpers/user-serializers'
import {
  LoadAddressByZipCode,
  LoadCityById,
  LoadStateById,
  LoadNeighborhoodById
} from '@/domain/usecases'

export type UserListViewProps = {
  users: User[]
  isLoading: boolean
  error: string | null
  searchTerm: string
  statusFilter: string
  roleFilter: string
  isUserModalOpen: boolean
  isCredentialModalOpen: boolean
  selectedUser: User | undefined
  userForCredentials: User | null

  onSearchChange: (term: string) => void
  onStatusFilterChange: (status: string) => void
  onRoleFilterChange: (role: string) => void

  onOpenCreate: () => void
  onOpenEdit: (user: User) => void
  onOpenCredentials: (user: User) => void
  onDeleteClick: (user: User) => void

  onCloseUserModal: () => void
  onCloseCredentialModal: () => void

  onSaveUser: (data: UserFormData) => Promise<void>
  onSaveCredentials: (data: CredentialFormData) => Promise<void>

  loadAddressByZipCode: LoadAddressByZipCode
  loadCityById: LoadCityById
  loadStateById: LoadStateById
  loadNeighborhoodById: LoadNeighborhoodById
}

export function UserListView({
  users,
  isLoading,
  error,
  searchTerm,
  statusFilter,
  roleFilter,
  isUserModalOpen,
  isCredentialModalOpen,
  selectedUser,
  userForCredentials,
  onSearchChange,
  onStatusFilterChange,
  onRoleFilterChange,
  onOpenCreate,
  onOpenEdit,
  onOpenCredentials,
  onDeleteClick,
  onCloseUserModal,
  onCloseCredentialModal,
  onSaveUser,
  onSaveCredentials,
  loadAddressByZipCode,
  loadCityById,
  loadStateById,
  loadNeighborhoodById
}: UserListViewProps) {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-8">
      <Modal
        isOpen={isUserModalOpen}
        onClose={onCloseUserModal}
        title={selectedUser ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}
        subtitle={
          selectedUser
            ? 'Atualize as informações do usuário.'
            : 'Preencha os campos obrigatórios para registrar um novo membro.'
        }
        maxWidth="max-w-2xl"
      >
        <UserForm
          initialData={selectedUser}
          onCancel={onCloseUserModal}
          onSave={onSaveUser}
          loadAddressByZipCode={loadAddressByZipCode}
          loadCityById={loadCityById}
          loadStateById={loadStateById}
          loadNeighborhoodById={loadNeighborhoodById}
        />
      </Modal>

      {userForCredentials && (
        <CredentialModal
          key={userForCredentials.id}
          isOpen={isCredentialModalOpen}
          onClose={onCloseCredentialModal}
          userName={userForCredentials.name}
          initialRole={userForCredentials.role}
          onSave={onSaveCredentials}
        />
      )}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Gestão de Usuários
          </h2>
          <p className="mt-1 text-slate-400">
            Administre alunos, professores e funcionários cadastrados.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon="file_upload">
            Importar Lista
          </Button>
          <Button icon="person_add" onClick={onOpenCreate}>
            Novo Usuário
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex flex-col justify-between gap-2 border-slate-800 bg-[#161f2c] p-5">
          <div className="flex items-start justify-between">
            <span className="font-medium text-slate-400">
              Total de Usuários
            </span>
            <Icon name="group" className="text-slate-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-bold text-white">{users.length}</h3>
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-sm font-medium text-emerald-500">
                <Icon name="trending_up" className="mr-1 inline size-3" />
                5%
              </span>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col justify-between gap-2 border-slate-800 bg-[#161f2c] p-5">
          <div className="flex items-start justify-between">
            <span className="font-medium text-slate-400">Novos (Mês)</span>
            <Icon name="person_add" className="text-slate-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-bold text-white">
                {
                  users.filter((user) => {
                    if (!user.createdAt) return false
                    const createdAt = new Date(user.createdAt)
                    const now = new Date()
                    return (
                      createdAt.getMonth() === now.getMonth() &&
                      createdAt.getFullYear() === now.getFullYear()
                    )
                  }).length
                }
              </h3>
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-sm font-medium text-emerald-500">
                <Icon name="trending_up" className="mr-1 inline size-3" />
                12%
              </span>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col justify-between gap-2 border-slate-800 bg-[#161f2c] p-5">
          <div className="flex items-start justify-between">
            <span className="font-medium text-slate-400">Bloqueados</span>
            <Icon name="block" className="text-slate-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-bold text-white">
                {users.filter((u) => u.status === 'BLOCKED').length}
              </h3>
              <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-sm font-medium text-amber-500">
                <Icon name="trending_down" className="mr-1 inline size-3" />
                2%
              </span>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col items-center gap-4 lg:flex-row">
        <div className="relative w-full flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
            <Icon name="search" />
          </div>
          <input
            className="h-12 w-full rounded-xl border border-white/5 bg-[#161f2c] pl-12 pr-4 text-white placeholder-slate-500 outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
            placeholder="Buscar por nome, CPF ou email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex w-full gap-2 lg:w-auto">
          <select
            className="h-12 min-w-[120px] cursor-pointer appearance-none rounded-xl border border-white/5 bg-[#161f2c] px-4 text-slate-300 outline-none focus:border-primary/50"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            <option value="ALL">Status</option>
            <option value="ACTIVE">Ativo</option>
            <option value="INACTIVE">Inativo</option>
            <option value="BLOCKED">Bloqueado</option>
          </select>
          <select
            className="h-12 min-w-[120px] cursor-pointer appearance-none rounded-xl border border-white/5 bg-[#161f2c] px-4 text-slate-300 outline-none focus:border-primary/50"
            value={roleFilter}
            onChange={(e) => onRoleFilterChange(e.target.value)}
          >
            <option value="ALL">Grupo</option>
            <option value="STUDENT">Estudante</option>
            <option value="PROFESSOR">Professor</option>
            <option value="LIBRARIAN">Bibliotecário</option>
            <option value="ADMIN">Admin</option>
          </select>
          <Button
            variant="secondary"
            icon="download"
            className="shrink-0 basis-12"
          />
        </div>
      </div>
      <Card className="overflow-hidden border-slate-800 bg-[#161f2c]">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            Carregando usuários...
          </div>
        ) : error ? (
          <div className="bg-red-500/5 p-8 text-center text-red-500">
            {error}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-5">Usuário</th>
                  <th className="px-6 py-5">CPF</th>
                  <th className="px-6 py-5">Email</th>
                  <th className="px-6 py-5">Grupo</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="group transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={user.avatarUrl} alt={user.name} />
                        <div className="flex flex-col">
                          <span className="text-[15px] font-semibold text-white">
                            {user.name}
                          </span>
                          <span className="mt-0.5 text-xs text-slate-500">
                            {user.enrollmentId
                              ? `Matrícula: ${formatEnrollmentId(user.enrollmentId)}`
                              : `ID: ${user.id.substring(0, 8)}`}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm tracking-wide text-slate-400">
                      {formatCpf(user.cpf)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        label={formatUserRole(user.role)}
                        color={getUserRoleColor(user.role)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`size-1.5 rounded-full ${
                            user.status === 'ACTIVE'
                              ? 'bg-emerald-500'
                              : user.status === 'INACTIVE'
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                          }`}
                        ></div>
                        <span
                          className={`text-sm font-medium ${
                            user.status === 'ACTIVE'
                              ? 'text-emerald-500'
                              : user.status === 'INACTIVE'
                                ? 'text-amber-500'
                                : 'text-red-400'
                          }`}
                        >
                          {formatUserStatus(user.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-60 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => onOpenCredentials(user)}
                          className="flex size-8 items-center justify-center rounded text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                          title="Credenciais"
                        >
                          <Icon name="key" className="size-4" />
                        </button>
                        <button
                          onClick={() => onOpenEdit(user)}
                          className="flex size-8 items-center justify-center rounded text-slate-400 transition-colors hover:bg-white/5 hover:text-primary"
                          title="Editar"
                        >
                          <Icon name="edit" className="size-4" />
                        </button>
                        <button
                          onClick={() => onDeleteClick(user)}
                          className="flex size-8 items-center justify-center rounded text-slate-400 transition-colors hover:bg-white/5 hover:text-red-400"
                          title="Apagar"
                        >
                          <Icon name="delete" className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
