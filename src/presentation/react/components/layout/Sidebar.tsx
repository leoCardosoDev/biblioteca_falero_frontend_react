import React from 'react'
import { NavLink } from '@/presentation/react/components/ui/link'
import { useAuthContext } from '@/presentation/react/hooks/use-auth-context'
import { Icon } from '@/presentation/react/components/ui'
import { SidebarItem } from '@/presentation/react/types'

const NAV_ITEMS: { category: string; items: SidebarItem[] }[] = [
  {
    category: 'Principal',
    items: [
      { label: 'Dashboard', icon: 'dashboard', path: '/' },
      { label: 'Acervo', icon: 'book_2', path: '/books' },
      { label: 'Empréstimos', icon: 'sync_alt', path: '/loans' },
      { label: 'Reservas', icon: 'schedule', path: '/reservations' },
      { label: 'Usuários', icon: 'group', path: '/users' }
    ]
  },
  {
    category: 'Sistema',
    items: [
      { label: 'Relatórios', icon: 'bar_chart', path: '/reports' },
      { label: 'Configurações', icon: 'settings', path: '/settings' }
    ]
  }
]

export const Sidebar: React.FC = () => {
  const { user } = useAuthContext()

  const allowedRoles = ['ADMIN', 'LIBRARIAN']
  const canManageUsers = user && allowedRoles.includes(user.role)

  const filteredNavItems = NAV_ITEMS.map((section) => ({
    ...section,
    items: section.items.filter((item) => {
      if (item.path === '/users') return canManageUsers
      return true
    })
  })).filter((section) => section.items.length > 0)

  return (
    <aside className="hidden h-full w-72 shrink-0 flex-col border-r border-white/5 bg-card-dark lg:flex">
      <div className="flex items-center gap-3 border-b border-white/5 px-6 py-6">
        <div className="rounded-lg bg-primary/20 p-2">
          <Icon name="local_library" className="text-3xl text-primary" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
            Falero
          </h1>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Gestão Bibliotecária
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
        {filteredNavItems.map((section, idx) => (
          <React.Fragment key={idx}>
            <p className="mb-1 mt-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {section.category}
            </p>
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-slate-400 hover:bg-card-hover hover:text-white'
                  } `
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      name={item.icon}
                      className={
                        isActive
                          ? ''
                          : 'transition-colors group-hover:text-primary'
                      }
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
            {idx < filteredNavItems.length - 1 && (
              <div className="my-2 border-t border-white/5" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="border-t border-white/5 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400">
          <Icon name="logout" />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </aside>
  )
}
