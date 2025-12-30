import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/presentation/components/layout';
import { Dashboard } from '@/presentation/pages/dashboard/dashboard';
import { Books } from '@/presentation/pages/books/books';
import { Loans } from '@/presentation/pages/loans/loans';
import { Reservations } from '@/presentation/pages/reservations/reservations';
import { Reports } from '@/presentation/pages/reports/reports';
import { Settings } from '@/presentation/pages/settings/settings';
import { MakeLogin } from '@/main/factories/pages/login/login-factory';
import { MakeUserList } from '@/main/factories/pages/user-list/user-list-factory';
import { PrivateRoute } from '@/presentation/components/private-route';
import { AuthProvider } from '@/presentation/contexts/auth-context';
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';

const App: React.FC = () => {
    const cacheRepository = new LocalStorageAdapter();

    return (
        <AuthProvider cacheRepository={cacheRepository}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<MakeLogin />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="books" element={<Books />} />
                            <Route path="loans" element={<Loans />} />
                            <Route path="users" element={<MakeUserList />} />
                            <Route path="reservations" element={<Reservations />} />
                            <Route path="reports" element={<Reports />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;