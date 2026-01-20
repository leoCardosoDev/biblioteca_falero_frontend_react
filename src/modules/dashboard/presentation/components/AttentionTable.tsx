import type { AttentionItem } from '../../domain'

import { Icon, Badge } from '@/shared/presentation/ui'

interface AttentionTableProps {
  items: AttentionItem[]
}

export function AttentionTable({ items }: AttentionTableProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-white/5 bg-card-dark shadow-sm lg:col-span-2">
      <div className="flex items-center justify-between border-b border-white/5 p-6">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-white">
            <Icon name="warning" className="text-danger" />
            Atenção Necessária
          </h3>
          <p className="text-sm text-slate-400">
            Pendências urgentes e manutenções
          </p>
        </div>
        <button className="text-sm font-medium text-primary hover:underline">
          Ver todos
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/50 text-xs font-medium uppercase text-slate-400">
            <tr>
              <th className="px-6 py-4">Obra / Usuário</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Prazo</th>
              <th className="px-6 py-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((item) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-card-hover"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-white">
                      {item.bookTitle}
                    </span>
                    <span className="text-xs text-slate-500">
                      {item.userName} • ID #{item.userId}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge
                    label={item.statusLabel}
                    color={item.status === 'overdue' ? 'danger' : 'warning'}
                  />
                </td>
                <td className="px-6 py-4 text-slate-400">
                  {item.dueDate ?? '--'}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    className={`text-slate-400 transition-colors ${
                      item.status === 'overdue'
                        ? 'hover:text-primary'
                        : 'hover:text-success'
                    }`}
                  >
                    <Icon
                      name={
                        item.status === 'overdue'
                          ? 'notifications_active'
                          : 'check_circle'
                      }
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
