import React, { useState } from 'react';
import { MOCK_RESERVATIONS } from '@/services/mock-data';
import { Button, Card, Icon, Avatar, Badge } from '@/presentation/components/ui';
import { Modal } from '@/presentation/components/ui';
import { ReservationForm } from '@/presentation/components/forms';

export const Reservations: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nova Reserva"
                subtitle="Preencha os dados abaixo para reservar um item do acervo."
                maxWidth="max-w-[640px]"
            >
                <ReservationForm onCancel={() => setIsModalOpen(false)} onSave={() => setIsModalOpen(false)} />
            </Modal>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Reservas</h2>
                    <p className="text-slate-400 mt-1">Gerencie a fila de espera e disponibilidade de exemplares.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" icon="history">Histórico</Button>
                    <Button icon="add" onClick={() => setIsModalOpen(true)}>Nova Reserva</Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-5 flex items-center gap-4 hover:border-warning/30 transition-colors">
                    <div className="size-12 rounded-lg bg-warning/20 text-warning flex items-center justify-center">
                        <Icon name="hourglass_top" className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Fila de Espera</p>
                        <h3 className="text-2xl font-bold text-white">12</h3>
                    </div>
                </Card>
                <Card className="p-5 flex items-center gap-4 hover:border-success/30 transition-colors">
                    <div className="size-12 rounded-lg bg-success/20 text-success flex items-center justify-center">
                        <Icon name="event_available" className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Disponível para Retirada</p>
                        <h3 className="text-2xl font-bold text-white">3</h3>
                    </div>
                </Card>
                <Card className="p-5 flex items-center gap-4 hover:border-danger/30 transition-colors">
                    <div className="size-12 rounded-lg bg-danger/20 text-danger flex items-center justify-center">
                        <Icon name="event_busy" className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Expirando Hoje</p>
                        <h3 className="text-2xl font-bold text-white">1</h3>
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
                        placeholder="Buscar por usuário, livro ou ID..."
                    />
                </div>
                <div className="flex gap-4">
                    <select className="h-12 rounded-xl bg-surface-dark border border-white/10 text-white px-4 cursor-pointer focus:ring-2 focus:ring-primary/50 min-w-[200px]">
                        <option>Todos os Status</option>
                        <option>Aguardando</option>
                        <option>Disponível</option>
                        <option>Cancelado</option>
                    </select>
                </div>
            </div>

            {/* Reservations Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#111a22] border-b border-white/10">
                                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Obra Solicitada</th>
                                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Solicitante</th>
                                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Data Solicitação</th>
                                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {MOCK_RESERVATIONS.map((res) => (
                                <tr key={res.id} className="group hover:bg-[#1e2e3e] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-8 rounded bg-gray-700 bg-cover bg-center shadow-sm" style={{ backgroundImage: `url('${res.book.coverUrl}')` }}></div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-white text-sm">{res.book.title}</span>
                                                <span className="text-xs text-text-secondary">{res.book.isbn}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Avatar src={res.user.avatarUrl} size="sm" />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-white">{res.user.name}</span>
                                                <span className="text-xs text-text-secondary">{res.user.role}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-white">{res.requestDate}</span>
                                            {res.expiryDate && (
                                                <span className="text-xs text-danger flex items-center gap-1">
                                                    Expira: {res.expiryDate}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <Badge
                                                label={res.status}
                                                color={
                                                    res.status === 'Disponível' ? 'success' :
                                                        res.status === 'Aguardando' ? 'warning' : 'neutral'
                                                }
                                            />
                                            {res.status === 'Aguardando' && (
                                                <span className="text-xs text-text-secondary ml-1">Posição na fila: <strong>#{res.queuePosition}</strong></span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                            {res.status === 'Disponível' && (
                                                <button className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors" title="Efetivar Empréstimo">
                                                    <Icon name="check" />
                                                </button>
                                            )}
                                            {res.status === 'Aguardando' && (
                                                <button className="flex size-8 items-center justify-center rounded-lg hover:bg-success/10 text-slate-400 hover:text-success transition-colors" title="Notificar Disponibilidade">
                                                    <Icon name="notifications" />
                                                </button>
                                            )}
                                            <button className="flex size-8 items-center justify-center rounded-lg hover:bg-danger/10 text-slate-400 hover:text-danger transition-colors" title="Cancelar">
                                                <Icon name="close" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};