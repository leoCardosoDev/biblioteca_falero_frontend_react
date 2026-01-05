import React from 'react'
import { AreaChart } from '@/presentation/react/components/ui/charts'
import { Card, Button, Icon, Badge } from '@/presentation/react/components/ui'
// TODO: Replace with HttpRepository when Backend Dashboard Task is complete
import { DASHBOARD_STATS } from '@/infra'

const data = [
  { name: '01 Nov', loans: 400 },
  { name: '08 Nov', loans: 300 },
  { name: '15 Nov', loans: 200 },
  { name: '22 Nov', loans: 278 },
  { name: '29 Nov', loans: 189 }
]

export const Dashboard: React.FC = () => {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-8">
      {/* Page Heading */}
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {DASHBOARD_STATS.map((stat, idx) => (
          <Card
            key={idx}
            className="group p-5 transition-all hover:border-primary/30"
          >
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
            <p className="mb-1 text-sm font-medium text-slate-400">
              {stat.title}
            </p>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Line Chart */}
        <div className="rounded-xl border border-white/5 bg-card-dark p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                Fluxo de Empréstimos
              </h3>
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

        {/* Top Books List */}
        <Card className="flex flex-col p-6">
          <h3 className="mb-1 text-lg font-bold text-white">
            Top Obras Emprestadas
          </h3>
          <p className="mb-6 text-sm text-slate-400">Mais populares este mês</p>
          <div className="flex flex-1 flex-col justify-center gap-5">
            {[
              {
                title: 'Dom Quixote',
                val: 142,
                pct: '85%',
                color: 'bg-primary'
              },
              { title: '1984', val: 110, pct: '65%', color: 'bg-indigo-500' },
              {
                title: 'O Pequeno Príncipe',
                val: 98,
                pct: '58%',
                color: 'bg-sky-500'
              },
              {
                title: 'Harry Potter',
                val: 76,
                pct: '45%',
                color: 'bg-teal-500'
              },
              { title: 'A Bíblia', val: 42, pct: '25%', color: 'bg-slate-500' }
            ].map((item, i) => (
              <div className="group" key={i}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-white">{item.title}</span>
                  <span className="text-slate-400">{item.val}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: item.pct }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Alerts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
                <tr className="transition-colors hover:bg-card-hover">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">
                        Harry Potter e a Pedra Filosofal
                      </span>
                      <span className="text-xs text-slate-500">
                        João da Silva • ID #8492
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge label="Atrasado (2 dias)" color="danger" />
                  </td>
                  <td className="px-6 py-4 text-slate-400">12 Nov 2023</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 transition-colors hover:text-primary">
                      <Icon name="notifications_active" />
                    </button>
                  </td>
                </tr>
                <tr className="transition-colors hover:bg-card-hover">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">Clean Code</span>
                      <span className="text-xs text-slate-500">
                        Acervo Interno • ID #3321
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge label="Manutenção" color="warning" />
                  </td>
                  <td className="px-6 py-4 text-slate-400">--</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 transition-colors hover:text-success">
                      <Icon name="check_circle" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col rounded-xl border border-white/5 bg-gradient-to-br from-card-dark to-slate-900 p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-white">Ações Rápidas</h3>
          <div className="flex flex-col gap-3">
            {[
              {
                label: 'Cadastrar Usuário',
                sub: 'Novo aluno',
                icon: 'person_add',
                color: 'text-primary bg-primary/20'
              },
              {
                label: 'Processar Devolução',
                sub: 'Via código de barras',
                icon: 'assignment_return',
                color: 'text-success bg-success/20'
              },
              {
                label: 'Inventário Rápido',
                sub: 'Auditoria de estante',
                icon: 'inventory_2',
                color: 'text-warning bg-warning/20'
              }
            ].map((action, i) => (
              <button
                key={i}
                className="group flex items-center gap-4 rounded-lg border border-white/5 bg-slate-800/50 p-4 text-left transition-all hover:bg-slate-700/50"
              >
                <div
                  className={`flex size-10 items-center justify-center rounded-lg ${action.color} transition-transform group-hover:scale-110`}
                >
                  <Icon name={action.icon} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {action.label}
                  </p>
                  <p className="text-xs text-slate-500">{action.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
