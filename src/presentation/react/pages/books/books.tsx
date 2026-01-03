import React, { useState } from 'react';
// TODO: Replace with HttpRepository when Backend Task (Catalog/Books) is complete
import { MOCK_BOOKS } from '@/infra/mocks/mock-data';
import { Button, Card, Icon, Badge } from '@/presentation/react/components/ui';
import { Modal } from '@/presentation/react/components/ui';
import { BookForm } from '@/presentation/react/components/forms';

export const Books: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Cadastrar Nova Obra"
                subtitle="Preencha os dados abaixo para adicionar ao acervo."
                maxWidth="max-w-5xl"
            >
                <BookForm onCancel={() => setIsModalOpen(false)} onSave={() => setIsModalOpen(false)} />
            </Modal>

            {/* Heading */}
            <div className="flex flex-wrap justify-between items-end gap-6">
                <div className="flex flex-col gap-2 max-w-2xl">
                    <h1 className="text-white text-3xl font-black leading-tight tracking-tight">Acervo de Obras</h1>
                    <p className="text-text-secondary text-base">Gerencie o catálogo conceitual da biblioteca e adicione novos títulos.</p>
                </div>
                <Button icon="add_circle" onClick={() => setIsModalOpen(true)}>Cadastrar Obra</Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
                        <Icon name="search" />
                    </div>
                    <input
                        className="w-full rounded-xl bg-surface-dark border border-white/10 text-white placeholder-text-secondary py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50"
                        placeholder="Buscar por título, ISBN ou palavra-chave..."
                    />
                </div>
                <div className="flex flex-wrap gap-4">
                    {['Filtrar por Autor', 'Filtrar por Gênero', 'Filtrar por Idioma'].map((ph, i) => (
                        <div key={i} className="relative flex-1 min-w-[200px]">
                            <select className="w-full rounded-lg bg-surface-dark border border-white/10 text-white h-12 px-4 pr-10 appearance-none cursor-pointer">
                                <option disabled selected>{ph}</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                                <Icon name="expand_more" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#111a22] border-b border-white/10">
                                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase w-20">Capa</th>
                                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Título da Obra</th>
                                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Autor</th>
                                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase hidden md:table-cell">ISBN</th>
                                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Gênero</th>
                                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {MOCK_BOOKS.map((book) => (
                                <tr key={book.id} className="group hover:bg-[#1e2e3e] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="h-16 w-12 rounded bg-cover bg-center shadow-md group-hover:scale-110 transition-transform" style={{ backgroundImage: `url('${book.coverUrl}')` }}></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-white text-base">{book.title}</span>
                                            <span className="text-xs text-text-secondary md:hidden">ISBN: {book.isbn}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300 font-medium">{book.author}</td>
                                    <td className="px-6 py-4 text-sm text-text-secondary font-mono hidden md:table-cell">{book.isbn}</td>
                                    <td className="px-6 py-4">
                                        <Badge label={book.category} color="primary" />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="flex size-8 items-center justify-center rounded-lg hover:bg-primary/10 text-slate-500 hover:text-primary transition-colors"><Icon name="visibility" /></button>
                                            <button className="flex size-8 items-center justify-center rounded-lg hover:bg-primary/10 text-slate-500 hover:text-primary transition-colors"><Icon name="edit" /></button>
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