import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { UserForm } from '../components/ui/UserForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Icon } from '../components/ui/Icon';
import type { User } from '../../domain/entities/User';

export const UserList: React.FC = () => {
  const { users, loading, error, deleteUser, createUser, updateUser } = useUsers();
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'librarian' | 'user'>('all');

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      await deleteUser(id);
    }
  };

  const handleCreate = () => {
    setEditingUser(undefined);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingUser(undefined);
  };

  const handleFormSubmit = async (user: Omit<User, 'id'> | User) => {
    if ('id' in user) {
      await updateUser(user);
    } else {
      await createUser(user as Omit<User, 'id'>);
    }
    handleFormClose();
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (user.status || 'active') === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  if (loading && users.length === 0) return (
    <div className="flex justify-center items-center h-full p-8 text-text-secondary">
      <Icon name="progress_activity" className="animate-spin text-3xl mr-2" />
      Carregando usuários...
    </div>
  );

  if (error) return (
    <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg border border-red-100">
      <Icon name="error" className="text-4xl mb-2" />
      <p>Erro: {error}</p>
    </div>
  );

  return (
    <div className="space-y-6">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Gestão de Usuário</h1>
          <p className="text-text-secondary">Administre alunos, professores e funcionários cadastrados.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="whitespace-nowrap">
            <Icon name="upload_file" className="mr-2" />
            Importar Lista
          </Button>
          <Button onClick={handleCreate} aria-label="Adicionar Usuário" className="whitespace-nowrap">
            <Icon name="add" className="mr-2" />
            Novo Usuário
          </Button>
        </div>
      </div>

      {/* Statistics Cards (Mocked) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-4 bg-surface border border-border-light dark:border-border-dark">
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
            <Icon name="group" className="text-2xl" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Total de Usuários</p>
            <p className="text-2xl font-bold text-text-primary">1,248</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4 bg-surface border border-border-light dark:border-border-dark">
          <div className="p-3 rounded-lg bg-green-500/10 text-green-500">
            <Icon name="school" className="text-2xl" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Alunos Ativos</p>
            <p className="text-2xl font-bold text-text-primary">982</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4 bg-surface border border-border-light dark:border-border-dark">
          <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500">
            <Icon name="local_library" className="text-2xl" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Professores</p>
            <p className="text-2xl font-bold text-text-primary">145</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4 bg-surface border border-border-light dark:border-border-dark">
          <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
            <Icon name="block" className="text-2xl" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Bloqueados</p>
            <p className="text-2xl font-bold text-text-primary">12</p>
          </div>
        </Card>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            placeholder="Buscar por nome, email ou matrícula..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface text-text-primary border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as 'all' | 'admin' | 'librarian' | 'user')}
            className="w-full md:w-56 px-3 py-2 bg-surface text-text-primary border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
          >
            <option value="all">Todos os Tipos</option>
            <option value="admin">Administrador</option>
            <option value="librarian">Bibliotecário</option>
            <option value="user">Usuário</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'blocked')}
            className="w-full md:w-56 px-3 py-2 bg-surface text-text-primary border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativo</option>
            <option value="blocked">Bloqueado</option>
          </select>
        </div>
      </div>

      <Card className="overflow-hidden border border-border-light dark:border-border-dark bg-surface shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark">
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary">Usuário</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary">Email</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary">Função</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary">Status</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-text-secondary">
                    <div className="flex flex-col items-center justify-center">
                      <Icon name="search_off" className="text-4xl mb-2 opacity-50" />
                      <p>Nenhum usuário encontrado.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-background-light/50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-medium text-text-primary">{user.name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-text-secondary text-sm">{user.email}</td>
                    <td className="py-4 px-6">
                      <Badge
                        label={user.role === 'admin' ? 'Administrador' : user.role === 'librarian' ? 'Bibliotecário' : 'Usuário'}
                        color={user.role === 'admin' ? 'primary' : user.role === 'librarian' ? 'warning' : 'neutral'}
                        className="capitalize"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        label={user.status === 'blocked' ? 'Bloqueado' : 'Ativo'}
                        color={user.status === 'blocked' ? 'danger' : 'success'}
                        className="capitalize"
                      />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-text-secondary hover:text-primary transition-colors p-2 rounded-md hover:bg-background-light dark:hover:bg-zinc-700"
                          title="Editar"
                        >
                          <Icon name="edit" className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-text-secondary hover:text-red-500 transition-colors p-2 rounded-md hover:bg-background-light dark:hover:bg-zinc-700"
                          title="Excluir"
                        >
                          <Icon name="delete" className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        title={editingUser ? 'Editar Usuário' : 'Novo Usuário'}
      >
        <UserForm
          initialUser={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      </Modal>
    </div>
  );
};
