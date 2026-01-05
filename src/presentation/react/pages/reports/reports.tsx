import React from 'react'
import { BarChart, LineChart } from '@/presentation/react/components/ui/charts'
import { Button, Card, Icon } from '@/presentation/react/components/ui'
// TODO: Replace with HttpRepository when Backend Reporting Task is complete
import {
  CHART_LOANS_BY_CATEGORY,
  CHART_ACTIVITY_TRENDS,
  AVAILABLE_REPORTS
} from '@/infra'

export const Reports: React.FC = () => {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Relatórios e Análises
          </h2>
          <p className="mt-1 text-slate-400">
            Visualize indicadores de desempenho e exporte dados detalhados.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-surface-dark px-3 py-2 text-sm text-slate-300">
            <Icon name="calendar_today" className="text-base" />
            <span>Últimos 30 dias</span>
          </div>
          <Button icon="cloud_download">Exportar Tudo</Button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Category Chart */}
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                Preferências de Leitura
              </h3>
              <p className="text-sm text-slate-400">
                Empréstimos por categoria
              </p>
            </div>
            <button className="text-slate-500 hover:text-white">
              <Icon name="more_vert" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <BarChart
              data={CHART_LOANS_BY_CATEGORY}
              layout="vertical"
              xKey="value"
              yKey="name"
              series={[{ key: 'value', color: '#137fec' }]}
            />
          </div>
        </Card>

        {/* Activity Trend Chart */}
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Fluxo Diário</h3>
              <p className="text-sm text-slate-400">
                Empréstimos vs Devoluções
              </p>
            </div>
            <button className="text-slate-500 hover:text-white">
              <Icon name="more_vert" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <LineChart
              data={CHART_ACTIVITY_TRENDS}
              xKey="name"
              series={[
                { key: 'loans', color: '#137fec', name: 'Empréstimos' },
                { key: 'returns', color: '#0bda5b', name: 'Devoluções' }
              ]}
            />
          </div>
        </Card>
      </div>

      {/* Available Reports List */}
      <div>
        <h3 className="mb-4 text-xl font-bold text-white">
          Relatórios Disponíveis
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {AVAILABLE_REPORTS.map((report) => (
            <Card
              key={report.id}
              className="group flex cursor-pointer items-start gap-4 p-4 transition-all hover:border-primary/50"
            >
              <div
                className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${
                  report.format === 'PDF'
                    ? 'bg-red-500/10 text-red-500'
                    : report.format === 'XLSX'
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-blue-500/10 text-blue-500'
                }`}
              >
                <Icon
                  name={
                    report.format === 'PDF'
                      ? 'picture_as_pdf'
                      : report.format === 'XLSX'
                        ? 'table_view'
                        : 'description'
                  }
                  className="text-2xl"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="truncate pr-2 text-sm font-bold text-white transition-colors group-hover:text-primary">
                    {report.title}
                  </h4>
                  <Icon
                    name="download"
                    className="text-lg text-slate-500 transition-colors group-hover:text-white"
                  />
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded bg-surface-highlight px-1.5 py-0.5 text-xs font-medium text-slate-400">
                    {report.category}
                  </span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-500">{report.size}</span>
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  Gerado em: {report.date}
                </p>
              </div>
            </Card>
          ))}
          {/* Create New Report Card */}
          <button className="flex h-full min-h-[110px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/10 bg-white/5 p-4 text-slate-400 transition-all hover:border-primary/50 hover:bg-white/10 hover:text-white">
            <div className="flex size-10 items-center justify-center rounded-full bg-surface-highlight">
              <Icon name="add" />
            </div>
            <span className="text-sm font-medium">Gerar Novo Relatório</span>
          </button>
        </div>
      </div>
    </div>
  )
}
