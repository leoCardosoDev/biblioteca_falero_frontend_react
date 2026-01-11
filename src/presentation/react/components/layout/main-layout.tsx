import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Header } from './header'

export function MainLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-white">
      <Sidebar />
      <div className="relative flex h-full min-w-0 flex-1 flex-col bg-background-light dark:bg-background-dark">
        <Header />
        <div className="flex-1 overflow-y-auto scroll-smooth p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
