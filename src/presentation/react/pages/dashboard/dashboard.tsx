import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Button, Icon, Badge } from '@/presentation/react/components/ui';
// TODO: Replace with HttpRepository when Backend Dashboard Task is complete
import { DASHBOARD_STATS } from '@/infra/mocks/mock-data';

const data = [
  { name: '01 Nov', loans: 400 },
  { name: '08 Nov', loans: 300 },
  { name: '15 Nov', loans: 200 },
  { name: '22 Nov', loans: 278 },
  { name: '29 Nov', loans: 189 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Visão Geral</h2>
          <p className="text-slate-400 mt-1">Acompanhamento em tempo real das operações da biblioteca.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon="download">Exportar Relatório</Button>
          <Button icon="add">Novo Empréstimo</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {DASHBOARD_STATS.map((stat, idx) => (
          <Card key={idx} className="p-5 hover:border-primary/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.colorClass} group-hover:text-white group-hover:bg-primary/20 transition-colors`}>
                <Icon name={stat.icon} />
              </div>
              {stat.trend && (
                <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stat.trendDirection === 'up' ? 'text-success bg-success/10' :
                  stat.trendDirection === 'neutral' ? 'text-slate-500 bg-slate-700/30' :
                    'text-warning bg-warning/10'
                  }`}>
                  {stat.trend}
                </span>
              )}
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">{stat.title}</p>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="xl:col-span-2 bg-card-dark rounded-xl border border-white/5 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Fluxo de Empréstimos</h3>
              <p className="text-slate-400 text-sm">Movimentação nos últimos 30 dias</p>
            </div>
          </div>
          <div className="h-[280px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLoans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#137fec" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#137fec" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e2a36', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="loans" stroke="#137fec" strokeWidth={3} fillOpacity={1} fill="url(#colorLoans)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Books List */}
        <Card className="p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-1">Top Obras Emprestadas</h3>
          <p className="text-slate-400 text-sm mb-6">Mais populares este mês</p>
          <div className="flex flex-col gap-5 flex-1 justify-center">
            {[
              { title: "Dom Quixote", val: 142, pct: "85%", color: "bg-primary" },
              { title: "1984", val: 110, pct: "65%", color: "bg-indigo-500" },
              { title: "O Pequeno Príncipe", val: 98, pct: "58%", color: "bg-sky-500" },
              { title: "Harry Potter", val: 76, pct: "45%", color: "bg-teal-500" },
              { title: "A Bíblia", val: 42, pct: "25%", color: "bg-slate-500" }
            ].map((item, i) => (
              <div className="group" key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white font-medium">{item.title}</span>
                  <span className="text-slate-400">{item.val}</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: item.pct }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card-dark rounded-xl border border-white/5 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Icon name="warning" className="text-danger" />
                Atenção Necessária
              </h3>
              <p className="text-slate-400 text-sm">Pendências urgentes e manutenções</p>
            </div>
            <button className="text-primary text-sm font-medium hover:underline">Ver todos</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-slate-400 font-medium uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Obra / Usuário</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Prazo</th>
                  <th className="px-6 py-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-card-hover transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">Harry Potter e a Pedra Filosofal</span>
                      <span className="text-xs text-slate-500">João da Silva • ID #8492</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><Badge label="Atrasado (2 dias)" color="danger" /></td>
                  <td className="px-6 py-4 text-slate-400">12 Nov 2023</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors"><Icon name="notifications_active" /></button>
                  </td>
                </tr>
                <tr className="hover:bg-card-hover transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">Clean Code</span>
                      <span className="text-xs text-slate-500">Acervo Interno • ID #3321</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><Badge label="Manutenção" color="warning" /></td>
                  <td className="px-6 py-4 text-slate-400">--</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-success transition-colors"><Icon name="check_circle" /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-card-dark to-slate-900 rounded-xl border border-white/5 p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-white mb-4">Ações Rápidas</h3>
          <div className="flex flex-col gap-3">
            {[
              { label: "Cadastrar Usuário", sub: "Novo aluno", icon: "person_add", color: "text-primary bg-primary/20" },
              { label: "Processar Devolução", sub: "Via código de barras", icon: "assignment_return", color: "text-success bg-success/20" },
              { label: "Inventário Rápido", sub: "Auditoria de estante", icon: "inventory_2", color: "text-warning bg-warning/20" }
            ].map((action, i) => (
              <button key={i} className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-white/5 transition-all group text-left">
                <div className={`size-10 rounded-lg flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                  <Icon name={action.icon} />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{action.label}</p>
                  <p className="text-slate-500 text-xs">{action.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};