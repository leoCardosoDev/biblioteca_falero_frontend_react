import React, { useState } from 'react';
import { Button, Card, Icon, Avatar, Switch } from '@/presentation/components/UI/Components';

// --- Sub-components for Sections ---

const ProfileSettings: React.FC = () => (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
        <div>
            <h2 className="text-2xl font-bold text-white">Perfil Público</h2>
            <p className="text-slate-400 text-sm mt-1">Gerencie como você aparece para outros usuários do sistema.</p>
        </div>

        <Card className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-8 border-b border-white/5">
                <Avatar size="lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgS8E4UNjwCOwPAn2NQrSkwKFOFobY5P2AmjYrrCZEC4GQNrwZZM6hXOm4_68GTIgrRo6CKYCDC1mW6Igy52vsCB1SlqXqpen0vTpo_PORgkdShCWztX7aQKCncjZlz5IqN7TN4WfalmWcPDpPM9clz4-7AAMauY2aEWa1gWTA0oInr5LKwl_osCiCVRBQCrab3RidlyNJ-3NdnwlQCAVRKGNSUiqt4X_FTSaDUghasqlPpVGifozcUzCMKXlqGfjPR0mnvxqAdH9n" />
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">Sua Foto</h3>
                    <p className="text-slate-400 text-sm mb-3">Isso será exibido no seu perfil e nas interações.</p>
                    <div className="flex gap-3">
                        <Button variant="secondary" className="h-9 px-3 text-xs">Alterar Foto</Button>
                        <Button variant="ghost" className="h-9 px-3 text-xs text-danger hover:text-danger hover:bg-danger/10">Remover</Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300">Nome Completo</label>
                    <input className="bg-surface-dark border border-white/10 rounded-lg h-10 px-3 text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" defaultValue="Admin Falero" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300">Email</label>
                    <input className="bg-surface-dark border border-white/10 rounded-lg h-10 px-3 text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" defaultValue="admin@falero.edu" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300">Cargo</label>
                    <div className="relative">
                        <Icon name="lock" className="absolute left-3 top-2.5 text-slate-500 text-[18px]" />
                        <input disabled className="w-full bg-surface-dark/50 border border-white/5 rounded-lg h-10 pl-10 pr-3 text-slate-500 text-sm cursor-not-allowed" defaultValue="Administrador do Sistema" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300">Departamento</label>
                    <input className="bg-surface-dark border border-white/10 rounded-lg h-10 px-3 text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" defaultValue="Biblioteca Central" />
                </div>
            </div>

            <div className="mt-8 flex justify-end pt-6 border-t border-white/5">
                <Button>Salvar Alterações</Button>
            </div>
        </Card>
    </div>
);

const NotificationSettings: React.FC = () => {
    const [toggles, setToggles] = useState({
        emailAlerts: true,
        browserPush: true,
        weeklyDigest: false,
        loanDue: true,
        newBooks: true,
        systemUpdates: false
    });

    const handleToggle = (key: keyof typeof toggles) => (val: boolean) => {
        setToggles(prev => ({ ...prev, [key]: val }));
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold text-white">Notificações</h2>
                <p className="text-slate-400 text-sm mt-1">Escolha como e quando você deseja ser notificado.</p>
            </div>

            <div className="grid gap-6">
                <Card className="p-6">
                    <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                        <Icon name="mail" className="text-primary" /> Canais de Comunicação
                    </h3>
                    <div className="divide-y divide-white/5">
                        <Switch
                            label="Alertas por Email"
                            description="Receba atualizações importantes diretamente na sua caixa de entrada."
                            checked={toggles.emailAlerts}
                            onChange={handleToggle('emailAlerts')}
                        />
                        <Switch
                            label="Notificações no Navegador"
                            description="Permitir pop-ups de notificação enquanto estiver usando o sistema."
                            checked={toggles.browserPush}
                            onChange={handleToggle('browserPush')}
                        />
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                        <Icon name="event_note" className="text-success" /> Eventos Operacionais
                    </h3>
                    <div className="divide-y divide-white/5">
                        <Switch
                            label="Vencimento de Empréstimos"
                            description="Notificar 2 dias antes do prazo de devolução."
                            checked={toggles.loanDue}
                            onChange={handleToggle('loanDue')}
                        />
                        <Switch
                            label="Novas Aquisições"
                            description="Saber quando novos títulos forem adicionados ao acervo."
                            checked={toggles.newBooks}
                            onChange={handleToggle('newBooks')}
                        />
                        <Switch
                            label="Resumo Semanal"
                            description="Relatório simplificado enviado toda segunda-feira."
                            checked={toggles.weeklyDigest}
                            onChange={handleToggle('weeklyDigest')}
                        />
                    </div>
                </Card>
            </div>
            <div className="flex justify-end">
                <Button variant="secondary">Restaurar Padrões</Button>
            </div>
        </div>
    );
};

const SystemSettings: React.FC = () => (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
        <div>
            <h2 className="text-2xl font-bold text-white">Sistema & Segurança</h2>
            <p className="text-slate-400 text-sm mt-1">Configurações globais e proteção da conta.</p>
        </div>

        <Card className="p-6 border-l-4 border-l-primary">
            <h3 className="text-lg font-bold text-white mb-4">Alterar Senha</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                <div className="col-span-2">
                    <label className="text-sm font-medium text-slate-300">Senha Atual</label>
                    <input type="password" className="w-full bg-surface-dark border border-white/10 rounded-lg h-10 px-3 text-white mt-1 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-300">Nova Senha</label>
                    <input type="password" className="w-full bg-surface-dark border border-white/10 rounded-lg h-10 px-3 text-white mt-1 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-300">Confirmar Nova Senha</label>
                    <input type="password" className="w-full bg-surface-dark border border-white/10 rounded-lg h-10 px-3 text-white mt-1 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>
            </div>
            <div className="mt-6">
                <Button>Atualizar Senha</Button>
            </div>
        </Card>

        <Card className="p-6 border border-danger/20">
            <h3 className="text-lg font-bold text-white mb-2 text-danger flex items-center gap-2">
                <Icon name="warning" /> Zona de Perigo
            </h3>
            <p className="text-slate-400 text-sm mb-6">Ações irreversíveis que afetam sua conta ou dados locais.</p>

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-surface-dark border border-white/5">
                    <div>
                        <h4 className="text-white font-medium text-sm">Limpar Cache Local</h4>
                        <p className="text-slate-500 text-xs">Remove dados temporários armazenados no navegador.</p>
                    </div>
                    <Button variant="secondary" className="h-8 text-xs">Limpar</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-danger/5 border border-danger/10">
                    <div>
                        <h4 className="text-white font-medium text-sm">Desativar Conta</h4>
                        <p className="text-slate-500 text-xs">Sua conta será suspensa e requer contato com admin para reativar.</p>
                    </div>
                    <Button variant="danger" className="h-8 text-xs">Desativar</Button>
                </div>
            </div>
        </Card>
    </div>
);

// --- Main Settings Page ---

export const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'system'>('profile');

    return (
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-8 items-start">
            {/* Settings Navigation */}
            <Card className="w-full md:w-64 flex flex-col p-2 md:sticky md:top-6 shrink-0">
                <nav className="flex flex-col gap-1">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'profile'
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Icon name="person" className={activeTab === 'profile' ? 'text-white' : ''} />
                        Perfil
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'notifications'
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Icon name="notifications" className={activeTab === 'notifications' ? 'text-white' : ''} />
                        Notificações
                    </button>
                    <button
                        onClick={() => setActiveTab('system')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${activeTab === 'system'
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Icon name="settings" className={activeTab === 'system' ? 'text-white' : ''} />
                        Sistema
                    </button>
                </nav>
                <div className="mt-4 pt-4 border-t border-white/5 px-2">
                    <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest text-center">Falero v1.0.4</p>
                </div>
            </Card>

            {/* Content Area */}
            <div className="flex-1 min-w-0 w-full">
                {activeTab === 'profile' && <ProfileSettings />}
                {activeTab === 'notifications' && <NotificationSettings />}
                {activeTab === 'system' && <SystemSettings />}
            </div>
        </div>
    );
};