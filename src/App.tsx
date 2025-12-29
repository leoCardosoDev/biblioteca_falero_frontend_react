import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/presentation/components/Layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Books } from './pages/Books';
import { Loans } from './pages/Loans';
import { Users } from './pages/Users';
import { Reservations } from './pages/Reservations';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { MakeLogin } from '@/main/factories/pages/login/login-factory';
import { PrivateRoute } from '@/presentation/components/private-route';

const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<MakeLogin />} />

                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="books" element={<Books />} />
                        <Route path="loans" element={<Loans />} />
                        <Route path="users" element={<Users />} />
                        <Route path="reservations" element={<Reservations />} />
                        <Route path="reports" element={<Reports />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </HashRouter>
    );
};

export default App;