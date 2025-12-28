import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const BaseLayout: React.FC = () => {
  return (
    <div className="flex bg-background-dark min-h-screen font-display text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full relative overflow-y-auto">
        <Header />
        <main className="p-6 md:p-8 max-w-[1600px] w-full mx-auto pb-20 fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
