import { Icon } from '@/presentation/react/components/ui'

interface QuickAction {
  label: string
  description: string
  icon: string
  colorClass: string
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: 'Cadastrar Usuário',
    description: 'Novo aluno',
    icon: 'person_add',
    colorClass: 'text-primary bg-primary/20'
  },
  {
    label: 'Processar Devolução',
    description: 'Via código de barras',
    icon: 'assignment_return',
    colorClass: 'text-success bg-success/20'
  },
  {
    label: 'Inventário Rápido',
    description: 'Auditoria de estante',
    icon: 'inventory_2',
    colorClass: 'text-warning bg-warning/20'
  }
]

export function QuickActionsWidget() {
  return (
    <div className="flex flex-col rounded-xl border border-white/5 bg-gradient-to-br from-card-dark to-slate-900 p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-white">Ações Rápidas</h3>
      <div className="flex flex-col gap-3">
        {QUICK_ACTIONS.map((action, index) => (
          <button
            key={index}
            className="group flex items-center gap-4 rounded-lg border border-white/5 bg-slate-800/50 p-4 text-left transition-all hover:bg-slate-700/50"
          >
            <div
              className={`flex size-10 items-center justify-center rounded-lg ${action.colorClass} transition-transform group-hover:scale-110`}
            >
              <Icon name={action.icon} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{action.label}</p>
              <p className="text-xs text-slate-500">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
