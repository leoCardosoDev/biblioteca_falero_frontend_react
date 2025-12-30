import React, { useState } from 'react';
import { Button, Card, Icon, Avatar, Badge } from '@/presentation/components/ui';
import { Modal } from '@/presentation/components/ui';
import { UserForm, UserFormData } from '@/presentation/components/forms';
import { CredentialModal, CredentialFormData } from '@/presentation/components/credential-modal/credential-modal';
import { useUserManagement } from '@/presentation/hooks/use-user-management';
import { LoadUsers } from '@/domain/usecases/load-users';
import { AddUser } from '@/domain/usecases/add-user';
import { UpdateUser } from '@/domain/usecases/update-user';
import { DeleteUser } from '@/domain/usecases/delete-user';
import { AddUserLogin } from '@/domain/usecases/add-user-login';
import { LoadUserById } from '@/domain/usecases/load-user-by-id';
import { UserModel } from '@/domain/models/user-model';
import { formatUserRole, getUserRoleColor, formatUserStatus, formatEnrollmentId } from '@/presentation/helpers/user-serializers';

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
    const [selectedUser, setSelectedUser] = useState<UserModel | undefined>(undefined);
    const [userForCredentials, setUserForCredentials] = useState<UserModel | null>(null);

    const handleOpenCreate = () => {
        setSelectedUser(undefined);
        setIsUserModalOpen(true);
    };

    const handleOpenEdit = async (user: UserModel) => {
        const fullUser = await handleLoadUserById(user.id);
        if (fullUser) {
            setSelectedUser(fullUser);
            setIsUserModalOpen(true);
        }
    };

    const handleOpenCredentials = (user: UserModel) => {
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

    const onDeleteClick = async (user: UserModel) => {
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

            {/* Stats Cards - Mocked for now or calculate from users */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-5 flex items-center gap-4 hover:border-primary/30 transition-colors">
                    <div className="size-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                        <Icon name="group" className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Total de Usuários</p>
                        <h3 className="text-2xl font-bold text-white">{users.length}</h3>
                    </div>
                </Card>
                {/* Other stats... */}
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
                        <Icon name="search" />
                    </div>
                    <input
                        className="w-full h-12 rounded-xl bg-surface-dark border border-white/10 text-white placeholder-text-secondary pl-12 pr-4 focus:ring-2 focus:ring-primary/50"
                        placeholder="Buscar por nome, email ou matrícula..."
                    />
                </div>
                {/* Dropdowns */}
            </div>

            {/* Users Table */}
            <Card className="overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center text-slate-400">Carregando...</div>
                ) : error ? (
                    <div className="p-8 text-center text-red-500">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#111a22] border-b border-white/10">
                                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Usuário</th>
                                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Matrícula</th>
                                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Tipo</th>
                                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.map((user) => (
                                    <tr key={user.id} className="group hover:bg-[#1e2e3e] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar src={user.avatarUrl} />
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-white text-base">{user.name}</span>
                                                    <span className="text-xs text-text-secondary">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-300 font-mono">{formatEnrollmentId(user.enrollmentId)}</td>
                                        <td className="px-6 py-4">
                                            <Badge
                                                label={formatUserRole(user.role)}
                                                color={getUserRoleColor(user.role)}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`size-2 rounded-full ${user.status === 'active' ? 'bg-success' : 'bg-danger'}`}></div>
                                                <span className={`text-sm font-medium ${user.status === 'active' ? 'text-white' : 'text-danger'}`}>
                                                    {formatUserStatus(user.status)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleOpenCredentials(user)} className="flex size-8 items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors" title="Credenciais">
                                                    <Icon name="key" />
                                                </button>
                                                <button onClick={() => handleOpenEdit(user)} className="flex size-8 items-center justify-center rounded-lg hover:bg-primary/10 text-slate-400 hover:text-primary transition-colors" title="Editar">
                                                    <Icon name="edit" />
                                                </button>
                                                <button onClick={() => onDeleteClick(user)} className="flex size-8 items-center justify-center rounded-lg hover:bg-danger/10 text-slate-400 hover:text-danger transition-colors" title="Apagar">
                                                    <Icon name="delete" />
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