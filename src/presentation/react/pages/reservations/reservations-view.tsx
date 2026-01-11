import {
  Button,
  Card,
  Icon,
  Avatar,
  Badge
} from '@/presentation/react/components/ui'
import { Modal } from '@/presentation/react/components/ui'
import { ReservationForm } from '@/presentation/react/components/forms'

interface ReservationData {
  id: string | number
  book: {
    title: string
    isbn: string
    coverUrl: string
  }
  user: {
    name: string
    avatarUrl: string
    role: string
  }
  requestDate: string
  expiryDate?: string
  status: 'Disponível' | 'Aguardando' | 'Cancelado' | string
  queuePosition?: number
}

interface ReservationsViewProps {
  isModalOpen: boolean
  onOpenModal: () => void
  onCloseModal: () => void
  reservations: ReservationData[]
}

export function ReservationsView({
  isModalOpen,
  onOpenModal,
  onCloseModal,
  reservations
}: ReservationsViewProps) {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-8">
      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title="Nova Reserva"
        subtitle="Preencha os dados abaixo para reservar um item do acervo."
        maxWidth="max-w-[640px]"
      >
        <ReservationForm onCancel={onCloseModal} onSave={onCloseModal} />
      </Modal>

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Reservas
          </h2>
          <p className="mt-1 text-slate-400">
            Gerencie a fila de espera e disponibilidade de exemplares.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon="history">
            Histórico
          </Button>
          <Button icon="add" onClick={onOpenModal}>
            Nova Reserva
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-4 p-5 transition-colors hover:border-warning/30">
          <div className="flex size-12 items-center justify-center rounded-lg bg-warning/20 text-warning">
            <Icon name="hourglass_top" className="text-2xl" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Fila de Espera</p>
            <h3 className="text-2xl font-bold text-white">12</h3>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-5 transition-colors hover:border-success/30">
          <div className="flex size-12 items-center justify-center rounded-lg bg-success/20 text-success">
            <Icon name="event_available" className="text-2xl" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">
              Disponível para Retirada
            </p>
            <h3 className="text-2xl font-bold text-white">3</h3>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-5 transition-colors hover:border-danger/30">
          <div className="flex size-12 items-center justify-center rounded-lg bg-danger/20 text-danger">
            <Icon name="event_busy" className="text-2xl" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Expirando Hoje</p>
            <h3 className="text-2xl font-bold text-white">1</h3>
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
            <Icon name="search" />
          </div>
          <input
            className="h-12 w-full rounded-xl border border-white/10 bg-surface-dark pl-12 pr-4 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary/50"
            placeholder="Buscar por usuário, livro ou ID..."
          />
        </div>
        <div className="flex gap-4">
          <select className="h-12 min-w-[200px] cursor-pointer rounded-xl border border-white/10 bg-surface-dark px-4 text-white focus:ring-2 focus:ring-primary/50">
            <option>Todos os Status</option>
            <option>Aguardando</option>
            <option>Disponível</option>
            <option>Cancelado</option>
          </select>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-[#111a22]">
                <th className="px-6 py-4 text-xs font-bold uppercase text-text-secondary">
                  Obra Solicitada
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-text-secondary">
                  Solicitante
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-text-secondary">
                  Data Solicitação
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
              {reservations.map((res) => (
                <tr
                  key={res.id}
                  className="group transition-colors hover:bg-[#1e2e3e]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-12 w-8 rounded bg-gray-700 bg-cover bg-center shadow-sm"
                        style={{
                          backgroundImage: `url('${res.book.coverUrl}')`
                        }}
                      ></div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">
                          {res.book.title}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {res.book.isbn}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Avatar src={res.user.avatarUrl} size="sm" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">
                          {res.user.name}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {res.user.role}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-white">
                        {res.requestDate}
                      </span>
                      {res.expiryDate && (
                        <span className="flex items-center gap-1 text-xs text-danger">
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
                          res.status === 'Disponível'
                            ? 'success'
                            : res.status === 'Aguardando'
                              ? 'warning'
                              : 'neutral'
                        }
                      />
                      {res.status === 'Aguardando' && (
                        <span className="ml-1 text-xs text-text-secondary">
                          Posição na fila: <strong>#{res.queuePosition}</strong>
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-80 transition-opacity group-hover:opacity-100">
                      {res.status === 'Disponível' && (
                        <button
                          className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                          title="Efetivar Empréstimo"
                        >
                          <Icon name="check" />
                        </button>
                      )}
                      {res.status === 'Aguardando' && (
                        <button
                          className="flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-success/10 hover:text-success"
                          title="Notificar Disponibilidade"
                        >
                          <Icon name="notifications" />
                        </button>
                      )}
                      <button
                        className="flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-danger/10 hover:text-danger"
                        title="Cancelar"
                      >
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
  )
}
