import { Icon } from '@/presentation/react/components/ui'
import { ProfileDisplay } from '@/presentation/react/components/profile-display/profile-display'

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/5 bg-background-dark px-6 py-4">
      <div className="flex flex-1 items-center gap-4">
        <button className="text-slate-400 hover:text-white lg:hidden">
          <Icon name="menu" />
        </button>
        <div className="flex h-10 w-full max-w-md items-center overflow-hidden rounded-lg border border-white/5 bg-card-dark transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50">
          <div className="flex items-center justify-center pl-3 pr-2">
            <Icon name="search" className="text-[20px] text-slate-400" />
          </div>
          <input
            className="h-full w-full border-none bg-transparent py-0 text-sm text-white placeholder:text-slate-500 focus:ring-0"
            placeholder="Buscar por ISBN, Título ou Usuário..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <button className="relative flex size-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-card-hover hover:text-white">
            <Icon name="notifications" />
            <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-background-dark bg-danger"></span>
          </button>
          <button className="flex size-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-card-hover hover:text-white">
            <Icon name="settings" />
          </button>
        </div>
        <div className="mx-1 h-8 w-px bg-white/10"></div>
        <ProfileDisplay />
      </div>
    </header>
  )
}
