import { useState } from 'react'

import {
  Button,
  Card,
  Icon,
  Badge,
  Modal
} from '@/presentation/react/components/ui'

import { useBooks } from '@/modules/library/presentation/hooks'
import type { LibraryRepository } from '@/modules/library/application'
import type { Book } from '@/modules/library/domain'

interface BookListPageProps {
  repository: LibraryRepository
}

function getStatusBadgeColor(status: string): 'success' | 'warning' | 'error' {
  const colorMap: Record<string, 'success' | 'warning' | 'error'> = {
    available: 'success',
    borrowed: 'warning',
    maintenance: 'error'
  }
  return colorMap[status] ?? 'success'
}

function getStatusLabel(status: string): string {
  const labelMap: Record<string, string> = {
    available: 'Disponível',
    borrowed: 'Emprestado',
    maintenance: 'Manutenção'
  }
  return labelMap[status] ?? status
}

export function BookListPage({ repository }: BookListPageProps) {
  const { data: books, isLoading, isError } = useBooks(repository)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="text-text-secondary">Carregando...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="text-red-500">Erro ao carregar livros.</span>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Cadastrar Nova Obra"
        subtitle="Preencha os dados abaixo para adicionar ao acervo."
        maxWidth="max-w-5xl"
      >
        <div className="p-4 text-text-secondary">
          Formulário em desenvolvimento
        </div>
      </Modal>

      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-2xl flex-col gap-2">
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white">
            Acervo de Obras
          </h1>
          <p className="text-base text-text-secondary">
            Gerencie o catálogo conceitual da biblioteca e adicione novos
            títulos.
          </p>
        </div>
        <Button icon="add_circle" onClick={() => setIsModalOpen(true)}>
          Cadastrar Obra
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
            <Icon name="search" />
          </div>
          <input
            className="w-full rounded-xl border border-white/10 bg-surface-dark py-4 pl-12 pr-4 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary/50"
            placeholder="Buscar por título, ISBN ou palavra-chave..."
          />
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-[#111a22]">
                <th className="w-20 px-6 py-4 text-xs font-bold uppercase text-text-secondary">
                  Capa
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-text-secondary">
                  Título da Obra
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-text-secondary">
                  Autor
                </th>
                <th className="hidden px-6 py-4 text-xs font-bold uppercase text-text-secondary md:table-cell">
                  ISBN
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-text-secondary">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase text-text-secondary">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {books?.map((book: Book) => (
                <tr
                  key={book.id}
                  className="group transition-colors hover:bg-[#1e2e3e]"
                >
                  <td className="px-6 py-4">
                    <div
                      className="h-16 w-12 rounded bg-cover bg-center shadow-md transition-transform group-hover:scale-110"
                      style={{ backgroundImage: `url('${book.coverUrl}')` }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-white">
                        {book.title}
                      </span>
                      <span className="text-xs text-text-secondary md:hidden">
                        ISBN: {book.isbn}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-300">
                    {book.author}
                  </td>
                  <td className="hidden px-6 py-4 font-mono text-sm text-text-secondary md:table-cell">
                    {book.isbn}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      label={getStatusLabel(book.status)}
                      color={getStatusBadgeColor(book.status)}
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-primary/10 hover:text-primary">
                        <Icon name="visibility" />
                      </button>
                      <button className="flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-primary/10 hover:text-primary">
                        <Icon name="edit" />
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
  )
}
