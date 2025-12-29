import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { Header } from './header';

export const MainLayout: React.FC = () => {
    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full min-w-0 bg-background-light dark:bg-background-dark relative">
                <Header />
                <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};