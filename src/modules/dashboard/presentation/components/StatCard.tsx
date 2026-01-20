import type { DashboardStat } from '../../domain'

import { Card, Icon } from '@/shared/presentation/ui'

interface StatCardProps {
  stat: DashboardStat
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <Card className="group p-5 transition-all hover:border-primary/30">
      <div className="mb-4 flex items-start justify-between">
        <div
          className={`rounded-lg bg-white/5 p-2 ${stat.colorClass} transition-colors group-hover:bg-primary/20 group-hover:text-white`}
        >
          <Icon name={stat.icon} />
        </div>
        {stat.trend && (
          <span
            className={`flex items-center rounded-full px-2 py-1 text-xs font-bold ${
              stat.trendDirection === 'up'
                ? 'bg-success/10 text-success'
                : stat.trendDirection === 'neutral'
                  ? 'bg-slate-700/30 text-slate-500'
                  : 'bg-warning/10 text-warning'
            }`}
          >
            {stat.trend}
          </span>
        )}
      </div>
      <p className="mb-1 text-sm font-medium text-slate-400">{stat.title}</p>
      <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
    </Card>
  )
}
