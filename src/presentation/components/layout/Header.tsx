import React from 'react';
import { Icon } from '../ui/Icon';
import { Avatar } from '../ui/Avatar';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/5 bg-background-dark sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden text-slate-400 hover:text-white">
          <Icon name="menu" />
        </button>
        {/* Search Bar */}
        <div className="flex w-full max-w-md items-center rounded-lg bg-card-dark border border-white/5 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all h-10 overflow-hidden">
          <div className="flex items-center justify-center pl-3 pr-2">
            <Icon name="search" className="text-slate-400 text-[20px]" />
          </div>
          <input
            className="w-full bg-transparent border-none text-white text-sm placeholder:text-slate-500 focus:ring-0 h-full py-0"
            placeholder="Buscar por ISBN, Título ou Usuário..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <button className="relative flex items-center justify-center size-10 rounded-full hover:bg-card-hover text-slate-400 hover:text-white transition-colors">
            <Icon name="notifications" />
            <span className="absolute top-2 right-2 size-2 bg-danger rounded-full border-2 border-background-dark"></span>
          </button>
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-card-hover text-slate-400 hover:text-white transition-colors">
            <Icon name="settings" />
          </button>
        </div>
        <div className="h-8 w-px bg-white/10 mx-1"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">Admin Falero</p>
            <p className="text-xs text-slate-500">Administrador</p>
          </div>
          <Avatar
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgS8E4UNjwCOwPAn2NQrSkwKFOFobY5P2AmjYrrCZEC4GQNrwZZM6hXOm4_68GTIgrRo6CKYCDC1mW6Igy52vsCB1SlqXqpen0vTpo_PORgkdShCWztX7aQKCncjZlz5IqN7TN4WfalmWcPDpPM9clz4-7AAMauY2aEWa1gWTA0oInr5LKwl_osCiCVRBQCrab3RidlyNJ-3NdnwlQCAVRKGNSUiqt4X_FTSaDUghasqlPpVGifozcUzCMKXlqGfjPR0mnvxqAdH9n"
          />
        </div>
      </div>
    </header>
  );
};
