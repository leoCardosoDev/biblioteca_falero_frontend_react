import type {
  DashboardStat,
  LoanFlowDataPoint,
  TopBookItem,
  AttentionItem
} from '../../domain'

import { Button } from '@/presentation/react/components/ui'

import {
  StatCard,
  LoanFlowChart,
  TopBooksWidget,
  AttentionTable,
  QuickActionsWidget
} from '../components'

interface DashboardViewProps {
  stats: DashboardStat[]
  loanFlowData: LoanFlowDataPoint[]
  topBooks: TopBookItem[]
  attentionItems: AttentionItem[]
}

export function DashboardView({
  stats,
  loanFlowData,
  topBooks,
  attentionItems
}: DashboardViewProps) {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Visão Geral
          </h2>
          <p className="mt-1 text-slate-400">
            Acompanhamento em tempo real das operações da biblioteca.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon="download">
            Exportar Relatório
          </Button>
          <Button icon="add">Novo Empréstimo</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <LoanFlowChart data={loanFlowData} />
        <TopBooksWidget books={topBooks} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <AttentionTable items={attentionItems} />
        <QuickActionsWidget />
      </div>
    </div>
  )
}
