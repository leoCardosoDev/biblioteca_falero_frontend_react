import type { LoanFlowDataPoint } from '../../domain'

import { AreaChart } from '@/shared/presentation/ui/charts'

interface LoanFlowChartProps {
  data: LoanFlowDataPoint[]
}

export function LoanFlowChart({ data }: LoanFlowChartProps) {
  return (
    <div className="rounded-xl border border-white/5 bg-card-dark p-6 shadow-sm xl:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Fluxo de Empréstimos</h3>
          <p className="text-sm text-slate-400">
            Movimentação nos últimos 30 dias
          </p>
        </div>
      </div>
      <div className="mt-4 h-[280px] w-full">
        <AreaChart
          data={data}
          xKey="name"
          series={[{ key: 'loans', color: '#137fec', gradient: true }]}
        />
      </div>
    </div>
  )
}
