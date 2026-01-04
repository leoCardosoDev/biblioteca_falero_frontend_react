import React, { useState } from 'react';
import { Button, Card, Icon, Avatar, Badge } from '@/presentation/react/components/ui';
import { Modal } from '@/presentation/react/components/ui';
import { UserForm, UserFormData } from '@/presentation/react/components/forms';
import { CredentialModal, CredentialFormData } from '@/presentation/react/components/credential-modal/credential-modal';
import { useUserManagement } from '@/presentation/react/hooks/use-user-management';
import { LoadUsers } from '@/domain/usecases/load-users';
import { AddUser } from '@/domain/usecases/add-user';
import { UpdateUser } from '@/domain/usecases/update-user';
import { DeleteUser } from '@/domain/usecases/delete-user';
import { AddUserLogin } from '@/domain/usecases/add-user-login';
import { LoadUserById } from '@/domain/usecases/load-user-by-id';
import { User } from '@/domain/models/user';
import { formatUserRole, getUserRoleColor, formatUserStatus, formatEnrollmentId, formatCpf } from '@/presentation/react/helpers/user-serializers';

interface UsersProps {
    loadUsers: LoadUsers;
    addUser: AddUser;
    updateUser: UpdateUser;
    deleteUser: DeleteUser;
    addUserLogin: AddUserLogin;
    loadUserById: LoadUserById;
}

export const Users: React.FC<UsersProps> = ({ loadUsers, addUser, updateUser, deleteUser, addUserLogin, loadUserById }) => {
    const { users, isLoading, error, handleAddUser, handleUpdateUser, handleDeleteUser, handleLoadUserById } = useUserManagement({
        loadUsers, addUser, updateUser, deleteUser, loadUserById
    });

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isCredentialModalOpen, setIsCredentialModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
    const [userForCredentials, setUserForCredentials] = useState<User | null>(null);

    // Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [roleFilter, setRoleFilter] = useState('ALL');

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.cpf && user.cpf.includes(searchTerm)) ||
            (user.enrollmentId && user.enrollmentId.includes(searchTerm));

        const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter;
        const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;

        return matchesSearch && matchesStatus && matchesRole;
    });

    const handleOpenCreate = () => {
        setSelectedUser(undefined);
        setIsUserModalOpen(true);
    };

    const handleOpenEdit = async (user: User) => {
        const fullUser = await handleLoadUserById(user.id);
        if (fullUser) {
            setSelectedUser(fullUser);
            setIsUserModalOpen(true);
        }
    };

    const handleOpenCredentials = (user: User) => {
        setUserForCredentials(user);
        setIsCredentialModalOpen(true);
    };

    const onSaveUser = async (data: UserFormData) => {
        let success = false;
        if (selectedUser) {
            success = await handleUpdateUser({ id: selectedUser.id, ...data });
        } else {
            success = await handleAddUser(data);
        }

        if (success) {
            setIsUserModalOpen(false);
            // Optionally open credential modal after creation
            if (!selectedUser) {
                // Logic to prompt for credentials? For now just close.
            }
        }
    };

    const onSaveCredentials = async (data: CredentialFormData) => {
        if (userForCredentials) {
            try {
                await addUserLogin.perform({
                    userId: userForCredentials.id,
                    username: data.username,
                    password: data.password
                });
                setIsCredentialModalOpen(false);
                // toast.success('Credenciais atualizadas com sucesso!');
            } catch (_error) {
                // toast.error('Erro ao salvar credenciais');
            }
        }
    };

    const onDeleteClick = async (user: User) => {
        if (confirm(`Tem certeza que deseja excluir ${user.name}?`)) {
            await handleDeleteUser(user.id);
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
            <Modal
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                title={selectedUser ? "Editar Usuário" : "Cadastrar Novo Usuário"}
                subtitle={selectedUser ? "Atualize as informações do usuário." : "Preencha os campos obrigatórios para registrar um novo membro."}
                maxWidth="max-w-2xl"
            >
                <UserForm
                    initialData={selectedUser}
                    onCancel={() => setIsUserModalOpen(false)}
                    onSave={onSaveUser}
                />
            </Modal>

            {userForCredentials && (
                <CredentialModal
                    isOpen={isCredentialModalOpen}
                    onClose={() => setIsCredentialModalOpen(false)}
                    userName={userForCredentials.name}
                    onSave={onSaveCredentials}
                />
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Gestão de Usuários</h2>
                    <p className="text-slate-400 mt-1">Administre alunos, professores e funcionários cadastrados.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" icon="file_upload">Importar Lista</Button>
                    <Button icon="person_add" onClick={handleOpenCreate}>Novo Usuário</Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-5 flex flex-col justify-between gap-2 border-slate-800 bg-[#161f2c]">
                    <div className="flex justify-between items-start">
                        <span className="text-slate-400 font-medium">Total de Usuários</span>
                        <Icon name="group" className="text-slate-400" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-3xl font-bold text-white">{users.length}</h3>
                            <span className="text-sm font-medium text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                <Icon name="trending_up" className="inline mr-1 size-3" />
                                5%
                            </span>
                        </div>
                    </div>
                </Card>

                <Card className="p-5 flex flex-col justify-between gap-2 border-slate-800 bg-[#161f2c]">
                    <div className="flex justify-between items-start">
                        <span className="text-slate-400 font-medium">Novos (Mês)</span>
                        <Icon name="person_add" className="text-slate-400" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-3xl font-bold text-white">85</h3>
                            <span className="text-sm font-medium text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                <Icon name="trending_up" className="inline mr-1 size-3" />
                                12%
                            </span>
                        </div>
                    </div>
                </Card>

                <Card className="p-5 flex flex-col justify-between gap-2 border-slate-800 bg-[#161f2c]">
                    <div className="flex justify-between items-start">
                        <span className="text-slate-400 font-medium">Bloqueados</span>
                        <Icon name="block" className="text-slate-400" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-3xl font-bold text-white">{users.filter(u => u.status === 'BLOCKED').length}</h3>
                            <span className="text-sm font-medium text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                                <Icon name="trending_down" className="inline mr-1 size-3" />
                                2%
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex-1 relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
                        <Icon name="search" />
                    </div>
                    <input
                        className="w-full h-12 rounded-xl bg-[#161f2c] border border-white/5 text-white placeholder-slate-500 pl-12 pr-4 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none"
                        placeholder="Buscar por nome, CPF ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full lg:w-auto">
                    <select
                        className="h-12 bg-[#161f2c] border border-white/5 text-slate-300 rounded-xl px-4 outline-none focus:border-primary/50 cursor-pointer appearance-none min-w-[120px]"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="ALL">Status</option>
                        <option value="ACTIVE">Ativo</option>
                        <option value="INACTIVE">Inativo</option>
                        <option value="BLOCKED">Bloqueado</option>
                    </select>
                    <select
                        className="h-12 bg-[#161f2c] border border-white/5 text-slate-300 rounded-xl px-4 outline-none focus:border-primary/50 cursor-pointer appearance-none min-w-[120px]"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="ALL">Grupo</option>
                        <option value="STUDENT">Estudante</option>
                        <option value="PROFESSOR">Professor</option>
                        <option value="LIBRARIAN">Bibliotecário</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                    <Button variant="secondary" icon="download" className="basis-12 shrink-0" />
                </div>
            </div>

            {/* Users Table */}
            <Card className="overflow-hidden border-slate-800 bg-[#161f2c]">
                {isLoading ? (
                    <div className="p-12 text-center text-slate-400">
                        <div className="animate-spin size-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                        Carregando usuários...
                    </div>
                ) : error ? (
                    <div className="p-8 text-center text-red-500 bg-red-500/5">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <th className="px-6 py-5">Usuário</th>
                                    <th className="px-6 py-5">CPF</th>
                                    <th className="px-6 py-5">Email</th>
                                    <th className="px-6 py-5">Grupo</th>
                                    <th className="px-6 py-5">Status</th>
                                    <th className="px-6 py-5 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar src={user.avatarUrl} alt={user.name} />
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-white text-[15px]">{user.name}</span>
                                                    <span className="text-xs text-slate-500 mt-0.5">
                                                        {user.enrollmentId ? `Matrícula: ${formatEnrollmentId(user.enrollmentId)}` : `ID: ${user.id.substring(0, 8)}`}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-400 font-mono tracking-wide">
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
                                                <div className={`size-1.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                                <span className={`text-sm font-medium ${user.status === 'ACTIVE' ? 'text-slate-300' : 'text-slate-400'}`}>
                                                    {formatUserStatus(user.status)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleOpenCredentials(user)} className="flex size-8 items-center justify-center rounded hover:bg-white/5 text-slate-400 hover:text-white transition-colors" title="Credenciais">
                                                    <Icon name="key" className="size-4" />
                                                </button>
                                                <button onClick={() => handleOpenEdit(user)} className="flex size-8 items-center justify-center rounded hover:bg-white/5 text-slate-400 hover:text-primary transition-colors" title="Editar">
                                                    <Icon name="edit" className="size-4" />
                                                </button>
                                                <button onClick={() => onDeleteClick(user)} className="flex size-8 items-center justify-center rounded hover:bg-white/5 text-slate-400 hover:text-red-400 transition-colors" title="Apagar">
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
    );
};