import React from 'react';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Button, Card, Icon } from '@/presentation/components/ui';
// TODO: Replace with HttpRepository when Backend Reporting Task is complete
import { CHART_LOANS_BY_CATEGORY, CHART_ACTIVITY_TRENDS, AVAILABLE_REPORTS } from '@/infra/mocks/mock-data';

export const Reports: React.FC = () => {
    return (
        <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Relatórios e Análises</h2>
                    <p className="text-slate-400 mt-1">Visualize indicadores de desempenho e exporte dados detalhados.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-surface-dark px-3 py-2 rounded-lg border border-white/5 text-sm text-slate-300">
                        <Icon name="calendar_today" className="text-base" />
                        <span>Últimos 30 dias</span>
                    </div>
                    <Button icon="cloud_download">Exportar Tudo</Button>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Chart */}
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">Preferências de Leitura</h3>
                            <p className="text-slate-400 text-sm">Empréstimos por categoria</p>
                        </div>
                        <button className="text-slate-500 hover:text-white"><Icon name="more_vert" /></button>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={CHART_LOANS_BY_CATEGORY} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={80} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e2a36', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ fill: '#ffffff10' }}
                                />
                                <Bar dataKey="value" fill="#137fec" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Activity Trend Chart */}
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">Fluxo Diário</h3>
                            <p className="text-slate-400 text-sm">Empréstimos vs Devoluções</p>
                        </div>
                        <button className="text-slate-500 hover:text-white"><Icon name="more_vert" /></button>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={CHART_ACTIVITY_TRENDS}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e2a36', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="loans" name="Empréstimos" stroke="#137fec" strokeWidth={3} dot={{ r: 4, fill: '#137fec' }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="returns" name="Devoluções" stroke="#0bda5b" strokeWidth={3} dot={{ r: 4, fill: '#0bda5b' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Available Reports List */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4">Relatórios Disponíveis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {AVAILABLE_REPORTS.map((report) => (
                        <Card key={report.id} className="p-4 flex items-start gap-4 hover:border-primary/50 transition-all cursor-pointer group">
                            <div className={`size-12 rounded-lg flex items-center justify-center shrink-0 
                                ${report.format === 'PDF' ? 'bg-red-500/10 text-red-500' :
                                    report.format === 'XLSX' ? 'bg-green-500/10 text-green-500' :
                                        'bg-blue-500/10 text-blue-500'}`}>
                                <Icon name={
                                    report.format === 'PDF' ? 'picture_as_pdf' :
                                        report.format === 'XLSX' ? 'table_view' : 'description'
                                } className="text-2xl" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-white text-sm truncate pr-2 group-hover:text-primary transition-colors">{report.title}</h4>
                                    <Icon name="download" className="text-slate-500 text-lg group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs font-medium text-slate-400 bg-surface-highlight px-1.5 py-0.5 rounded">{report.category}</span>
                                    <span className="text-xs text-slate-500">•</span>
                                    <span className="text-xs text-slate-500">{report.size}</span>
                                </div>
                                <p className="text-xs text-slate-600 mt-2">Gerado em: {report.date}</p>
                            </div>
                        </Card>
                    ))}
                    {/* Create New Report Card */}
                    <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 text-slate-400 hover:text-white transition-all h-full min-h-[110px]">
                        <div className="size-10 rounded-full bg-surface-highlight flex items-center justify-center">
                            <Icon name="add" />
                        </div>
                        <span className="text-sm font-medium">Gerar Novo Relatório</span>
                    </button>
                </div>
            </div>
        </div>
    );
};