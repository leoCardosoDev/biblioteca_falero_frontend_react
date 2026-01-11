import { Loan } from '@/domain/models/loan'
import {
  Button,
  Card,
  Icon,
  Avatar,
  Badge,
  Modal
} from '@/presentation/react/components/ui'
import { LoanForm } from '@/presentation/react/components/forms'

export interface LoansViewProps {
  loans: Loan[]
  isModalOpen: boolean
  onOpenModal: () => void
  onCloseModal: () => void
  onSaveLoan: () => void
}

export function LoansView({
  loans,
  isModalOpen,
  onOpenModal,
  onCloseModal,
  onSaveLoan
}: LoansViewProps) {
  return (
    <div className="flex h-full">
      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title="Novo Empréstimo"
        subtitle="Preencha os dados abaixo para registrar um novo empréstimo."
        maxWidth="max-w-2xl"
      >
        <LoanForm onCancel={onCloseModal} onSave={onSaveLoan} />
      </Modal>

      <div className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">
              Gestão de Empréstimos
            </h2>
            <p className="text-text-secondary">
              Controle a circulação, monitore prazos e gerencie renovações.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" icon="file_download">
              Relatório
            </Button>
            <Button icon="add" onClick={onOpenModal}>
              Novo Empréstimo
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="group relative overflow-hidden p-5 transition-colors hover:border-primary/50">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20">
              <Icon name="book" className="text-6xl text-primary" />
            </div>
            <span className="text-sm font-medium text-text-secondary">
              Empréstimos Ativos
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">142</span>
              <span className="rounded bg-success/10 px-1.5 py-0.5 text-xs font-medium text-success">
                +12%
              </span>
            </div>
          </Card>
          <Card className="relative overflow-hidden p-5 transition-colors hover:border-danger/50">
            <div className="absolute right-0 top-0 p-4 opacity-10">
              <Icon name="warning" className="text-6xl text-danger" />
            </div>
            <span className="text-sm font-medium text-red-400">
              Itens Atrasados
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">8</span>
              <span className="rounded bg-danger/10 px-1.5 py-0.5 text-xs font-medium text-danger">
                +2 novos
              </span>
            </div>
          </Card>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-white/5 bg-surface-dark p-2 lg:flex-row">
          <div className="relative w-full lg:max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">
              <Icon name="search" />
            </div>
            <input
              className="block w-full rounded-lg border-none bg-background-dark p-2.5 pl-10 text-sm text-white focus:ring-1 focus:ring-primary"
              placeholder="Buscar..."
            />
          </div>
          <div className="flex w-full gap-1 overflow-x-auto lg:w-auto">
            <button className="whitespace-nowrap rounded-lg bg-surface-highlight px-4 py-2 text-sm font-medium text-white shadow-sm">
              Todos
            </button>
            <button className="whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-highlight hover:text-white">
              Ativos
            </button>
            <button className="flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-highlight hover:text-white">
              Atrasados{' '}
              <span className="rounded-full bg-danger/20 px-1.5 text-xs text-danger">
                8
              </span>
            </button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-surface-highlight/30">
                <th className="p-4 text-xs font-semibold uppercase text-text-secondary">
                  Leitor
                </th>
                <th className="p-4 text-xs font-semibold uppercase text-text-secondary">
                  Livro
                </th>
                <th className="p-4 text-xs font-semibold uppercase text-text-secondary">
                  Data Empréstimo
                </th>
                <th className="p-4 text-xs font-semibold uppercase text-text-secondary">
                  Vencimento
                </th>
                <th className="p-4 text-xs font-semibold uppercase text-text-secondary">
                  Status
                </th>
                <th className="p-4 text-right text-xs font-semibold uppercase text-text-secondary">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {loans.map((loan) => (
                <tr
                  key={loan.id}
                  className="group transition-colors hover:bg-surface-highlight/20"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar src={loan.user.avatarUrl} size="sm" />
                      <div>
                        <p className="font-medium text-white">
                          {loan.user.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          ID: {loan.user.enrollmentId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-7 rounded bg-gray-700 bg-cover bg-center shadow-sm"
                        style={{
                          backgroundImage: `url('${loan.book.coverUrl}')`
                        }}
                      ></div>
                      <div>
                        <p className="font-medium text-white">
                          {loan.book.title}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {loan.book.author}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-text-secondary">{loan.loanDate}</td>
                  <td
                    className={`p-4 ${
                      loan.status === 'Atrasado'
                        ? 'font-medium text-danger'
                        : 'text-white'
                    }`}
                  >
                    {loan.dueDate}
                  </td>
                  <td className="p-4">
                    <Badge
                      label={loan.status}
                      color={loan.status === 'Atrasado' ? 'danger' : 'success'}
                    />
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="rounded p-1.5 text-text-secondary hover:bg-surface-highlight hover:text-primary">
                        <Icon name="autorenew" />
                      </button>
                      <button className="rounded p-1.5 text-text-secondary hover:bg-surface-highlight hover:text-success">
                        <Icon name="check_circle" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}
