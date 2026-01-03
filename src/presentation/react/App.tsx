import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/presentation/react/components/layout';
import { ErrorBoundary } from '@/presentation/react/components/ui';
import { Dashboard } from '@/presentation/react/pages/dashboard/dashboard';
import { Books } from '@/presentation/react/pages/books/books';
import { Loans } from '@/presentation/react/pages/loans/loans';
import { Reservations } from '@/presentation/react/pages/reservations/reservations';
import { Reports } from '@/presentation/react/pages/reports/reports';
import { Settings } from '@/presentation/react/pages/settings/settings';
import { MakeLogin } from '@/main/factories/pages/login/login-factory';
import { MakeUserList } from '@/main/factories/pages/user-list/user-list-factory';
import { PrivateRoute } from '@/presentation/react/components/private-route';
import { AuthProvider } from '@/presentation/react/contexts/auth-context';
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';

import { HttpAuthenticationRepository } from '@/infra/http/http-authentication-repository';
import { RemoteAuthentication } from '@/application/usecases/remote-authentication';
import { AuthFacade } from '@/application/facades/auth-facade';

const App: React.FC = () => {
    // In a real app, base URL comes from env
    const url = '/api/login';
    const cacheRepository = new LocalStorageAdapter();
    const httpAuthenticationRepository = new HttpAuthenticationRepository(url);
    const remoteAuthentication = new RemoteAuthentication(httpAuthenticationRepository, cacheRepository);
    const authFacade = new AuthFacade(remoteAuthentication, cacheRepository);

    return (
        <AuthProvider authFacade={authFacade}>
            <ErrorBoundary>
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
            </ErrorBoundary>
        </AuthProvider>
    );
};

export default App;