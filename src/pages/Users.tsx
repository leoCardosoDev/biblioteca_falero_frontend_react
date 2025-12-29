import React, { useState } from 'react';
import { MOCK_USERS } from '../services/mockData';
import { Button, Card, Icon, Avatar, Badge } from '@/presentation/components/UI/Components';
import { Modal } from '@/presentation/components/UI/Modal';
import { UserForm } from '@/presentation/components/Forms/UserForm';

export const Users: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Cadastrar Novo Usuário"
                subtitle="Preencha os campos obrigatórios para registrar um novo membro."
                maxWidth="max-w-2xl"
            >
                <UserForm onCancel={() => setIsModalOpen(false)} onSave={() => setIsModalOpen(false)} />
            </Modal>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Gestão de Usuários</h2>
                    <p className="text-slate-400 mt-1">Administre alunos, professores e funcionários cadastrados.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" icon="file_upload">Importar Lista</Button>
                    <Button icon="person_add" onClick={() => setIsModalOpen(true)}>Novo Usuário</Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-5 flex items-center gap-4 hover:border-primary/30 transition-colors">
                    <div className="size-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                        <Icon name="group" className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Total de Usuários</p>
                        <h3 className="text-2xl font-bold text-white">1,248</h3>
                    </div>
                </Card>
                <Card className="p-5 flex items-center gap-4 hover:border-success/30 transition-colors">
                    <div className="size-12 rounded-lg bg-success/20 text-success flex items-center justify-center">
                        <Icon name="school" className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Alunos Ativos</p>
                        <h3 className="text-2xl font-bold text-white">982</h3>
                    </div>
                </Card>
                <Card className="p-5 flex items-center gap-4 hover:border-warning/30 transition-colors">
                    <div className="size-12 rounded-lg bg-warning/20 text-warning flex items-center justify-center">
                        <Icon name="history_edu" className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Professores</p>
                        <h3 className="text-2xl font-bold text-white">145</h3>
                    </div>
                </Card>
                <Card className="p-5 flex items-center gap-4 hover:border-danger/30 transition-colors">
                    <div className="size-12 rounded-lg bg-danger/20 text-danger flex items-center justify-center">
                        <Icon name="person_off" className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Bloqueados</p>
                        <h3 className="text-2xl font-bold text-white">12</h3>
                    </div>
                </Card>
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
                <div className="flex gap-4">
                    <select className="h-12 rounded-xl bg-surface-dark border border-white/10 text-white px-4 cursor-pointer focus:ring-2 focus:ring-primary/50 min-w-[160px]">
                        <option>Todos os Tipos</option>
                        <option>Estudante</option>
                        <option>Professor</option>
                        <option>Bibliotecário</option>
                    </select>
                    <select className="h-12 rounded-xl bg-surface-dark border border-white/10 text-white px-4 cursor-pointer focus:ring-2 focus:ring-primary/50 min-w-[160px]">
                        <option>Todos os Status</option>
                        <option>Ativo</option>
                        <option>Bloqueado</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <Card className="overflow-hidden">
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
                            {MOCK_USERS.map((user) => (
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
                                    <td className="px-6 py-4 text-sm text-gray-300 font-mono">{user.enrollmentId}</td>
                                    <td className="px-6 py-4">
                                        <Badge
                                            label={user.role}
                                            color={
                                                user.role === 'Estudante' ? 'primary' :
                                                    user.role === 'Professor' ? 'warning' :
                                                        user.role === 'Bibliotecário' ? 'success' : 'neutral'
                                            }
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`size-2 rounded-full ${user.status === 'Ativo' ? 'bg-success' : 'bg-danger'}`}></div>
                                            <span className={`text-sm font-medium ${user.status === 'Ativo' ? 'text-white' : 'text-danger'}`}>{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                            <button className="flex size-8 items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors" title="Histórico">
                                                <Icon name="history" />
                                            </button>
                                            <button className="flex size-8 items-center justify-center rounded-lg hover:bg-primary/10 text-slate-400 hover:text-primary transition-colors" title="Editar">
                                                <Icon name="edit" />
                                            </button>
                                            <button className="flex size-8 items-center justify-center rounded-lg hover:bg-danger/10 text-slate-400 hover:text-danger transition-colors" title="Bloquear">
                                                <Icon name="block" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-[#111a22]">
                    <span className="text-sm text-slate-400">Mostrando 1-5 de 1,248</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm text-slate-400 hover:text-white disabled:opacity-50">Anterior</button>
                        <button className="px-3 py-1 text-sm bg-primary text-white rounded">1</button>
                        <button className="px-3 py-1 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded">2</button>
                        <button className="px-3 py-1 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded">3</button>
                        <span className="px-3 py-1 text-sm text-slate-500">...</span>
                        <button className="px-3 py-1 text-sm text-slate-400 hover:text-white disabled:opacity-50">Próximo</button>
                    </div>
                </div>
            </Card>
        </div>
    );
};