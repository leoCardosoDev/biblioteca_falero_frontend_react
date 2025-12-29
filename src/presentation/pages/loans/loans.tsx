import React, { useState } from 'react';
import { MOCK_LOANS } from '@/services/mock-data';
import { Button, Card, Icon, Avatar, Badge } from '@/presentation/components/ui';
import { Modal } from '@/presentation/components/ui';
import { LoanForm } from '@/presentation/components/forms';

export const Loans: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex h-full">
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Novo Empréstimo"
                subtitle="Preencha os dados abaixo para registrar um novo empréstimo."
                maxWidth="max-w-2xl"
            >
                <LoanForm onCancel={() => setIsModalOpen(false)} onSave={() => setIsModalOpen(false)} />
            </Modal>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Gestão de Empréstimos</h2>
                        <p className="text-text-secondary">Controle a circulação, monitore prazos e gerencie renovações.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="secondary" icon="file_download">Relatório</Button>
                        <Button icon="add" onClick={() => setIsModalOpen(true)}>Novo Empréstimo</Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="p-5 relative overflow-hidden group hover:border-primary/50 transition-colors">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20"><Icon name="book" className="text-6xl text-primary" /></div>
                        <span className="text-text-secondary text-sm font-medium">Empréstimos Ativos</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-white">142</span>
                            <span className="text-success text-xs font-medium bg-success/10 px-1.5 py-0.5 rounded">+12%</span>
                        </div>
                    </Card>
                    <Card className="p-5 relative overflow-hidden hover:border-danger/50 transition-colors">
                        <div className="absolute right-0 top-0 p-4 opacity-10"><Icon name="warning" className="text-6xl text-danger" /></div>
                        <span className="text-red-400 text-sm font-medium">Itens Atrasados</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-white">8</span>
                            <span className="text-danger text-xs font-medium bg-danger/10 px-1.5 py-0.5 rounded">+2 novos</span>
                        </div>
                    </Card>
                    {/* Additional stats omitted for brevity but structure remains */}
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-surface-dark p-2 rounded-xl border border-white/5">
                    <div className="relative w-full lg:max-w-md">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary"><Icon name="search" /></div>
                        <input className="bg-background-dark border-none text-white text-sm rounded-lg focus:ring-1 focus:ring-primary block w-full pl-10 p-2.5" placeholder="Buscar..." />
                    </div>
                    <div className="flex gap-1 w-full lg:w-auto overflow-x-auto">
                        <button className="px-4 py-2 rounded-lg text-sm font-medium bg-surface-highlight text-white shadow-sm whitespace-nowrap">Todos</button>
                        <button className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface-highlight hover:text-white transition-colors whitespace-nowrap">Ativos</button>
                        <button className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface-highlight hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap">
                            Atrasados <span className="bg-danger/20 text-danger text-xs px-1.5 rounded-full">8</span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <Card className="overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10 bg-surface-highlight/30">
                                <th className="p-4 text-xs font-semibold text-text-secondary uppercase">Leitor</th>
                                <th className="p-4 text-xs font-semibold text-text-secondary uppercase">Livro</th>
                                <th className="p-4 text-xs font-semibold text-text-secondary uppercase">Data Empréstimo</th>
                                <th className="p-4 text-xs font-semibold text-text-secondary uppercase">Vencimento</th>
                                <th className="p-4 text-xs font-semibold text-text-secondary uppercase">Status</th>
                                <th className="p-4 text-xs font-semibold text-text-secondary uppercase text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {MOCK_LOANS.map((loan) => (
                                <tr key={loan.id} className="group hover:bg-surface-highlight/20 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar src={loan.user.avatarUrl} size="sm" />
                                            <div>
                                                <p className="font-medium text-white">{loan.user.name}</p>
                                                <p className="text-xs text-text-secondary">ID: {loan.user.enrollmentId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-7 rounded bg-gray-700 bg-cover bg-center shadow-sm" style={{ backgroundImage: `url('${loan.book.coverUrl}')` }}></div>
                                            <div>
                                                <p className="font-medium text-white">{loan.book.title}</p>
                                                <p className="text-xs text-text-secondary">{loan.book.author}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-text-secondary">{loan.loanDate}</td>
                                    <td className={`p-4 ${loan.status === 'Atrasado' ? 'text-danger font-medium' : 'text-white'}`}>
                                        {loan.dueDate}
                                    </td>
                                    <td className="p-4">
                                        <Badge label={loan.status} color={loan.status === 'Atrasado' ? 'danger' : 'success'} />
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 rounded hover:bg-surface-highlight text-text-secondary hover:text-primary"><Icon name="autorenew" /></button>
                                            <button className="p-1.5 rounded hover:bg-surface-highlight text-text-secondary hover:text-success"><Icon name="check_circle" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
};