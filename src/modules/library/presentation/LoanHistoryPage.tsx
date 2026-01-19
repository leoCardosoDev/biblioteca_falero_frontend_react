import { useLoans } from '@/modules/library/application/useLoans'
import { Button, Card, Badge } from '@/presentation/react/components/ui'

export function LoanHistoryPage() {
  const { data: loans, isLoading } = useLoans()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">
            Gestão de Empréstimos
          </h2>
        </div>
        <Button icon="add" onClick={() => {}}>
          Novo Empréstimo
        </Button>
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
                Vencimento
              </th>
              <th className="p-4 text-xs font-semibold uppercase text-text-secondary">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {loans?.map((loan) => (
              <tr
                key={loan.id}
                className="group transition-colors hover:bg-surface-highlight/20"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="font-medium text-white">
                      {loan.user.name}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-white">{loan.book.title}</td>
                <td
                  className={`p-4 ${loan.isOverdue() ? 'font-medium text-danger' : 'text-white'}`}
                >
                  {loan.dueDate}
                </td>
                <td className="p-4">
                  <Badge
                    label={loan.status}
                    color={
                      loan.isOverdue()
                        ? 'danger'
                        : loan.isActive()
                          ? 'success'
                          : 'neutral'
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
