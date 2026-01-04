import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '@/presentation/react/hooks/use-auth-context';
import { Icon } from '@/presentation/react/components/ui';
import { SidebarItem } from '../../types';

const NAV_ITEMS: { category: string; items: SidebarItem[] }[] = [
    {
        category: "Principal",
        items: [
            { label: "Dashboard", icon: "dashboard", path: "/" },
            { label: "Acervo", icon: "book_2", path: "/books" },
            { label: "Empréstimos", icon: "sync_alt", path: "/loans" },
            { label: "Reservas", icon: "schedule", path: "/reservations" },
            { label: "Usuários", icon: "group", path: "/users" },
        ]
    },
    {
        category: "Sistema",
        items: [
            { label: "Relatórios", icon: "bar_chart", path: "/reports" },
            { label: "Configurações", icon: "settings", path: "/settings" },
        ]
    }
];

export const Sidebar: React.FC = () => {
    const { user } = useAuthContext();

    const allowedRoles = ['ADMIN', 'LIBRARIAN'];
    const canManageUsers = user && allowedRoles.includes(user.role);

    const filteredNavItems = NAV_ITEMS.map(section => ({
        ...section,
        items: section.items.filter(item => {
            if (item.path === '/users') return canManageUsers;
            return true;
        })
    })).filter(section => section.items.length > 0);

    return (
        <aside className="hidden lg:flex flex-col w-72 bg-card-dark border-r border-white/5 h-full shrink-0">
            <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
                <div className="bg-primary/20 p-2 rounded-lg">
                    <Icon name="local_library" className="text-primary text-3xl" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-white text-xl font-bold leading-tight tracking-tight">Falero</h1>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Gestão Bibliotecária</p>
                </div>
            </div>


            <div className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
                {filteredNavItems.map((section, idx) => (
                    <React.Fragment key={idx}>
                        <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 mt-2">
                            {section.category}
                        </p>
                        {section.items.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-3 rounded-lg transition-all group ${isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "text-slate-400 hover:text-white hover:bg-card-hover"
                                    } `
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon name={item.icon} className={isActive ? "" : "group-hover:text-primary transition-colors"} />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                        {idx < filteredNavItems.length - 1 && <div className="my-2 border-t border-white/5" />}
                    </React.Fragment>
                ))}
            </div>

            <div className="p-4 border-t border-white/5">
                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <Icon name="logout" />
                    <span className="text-sm font-medium">Sair</span>
                </button>
            </div>
        </aside>
    );
};