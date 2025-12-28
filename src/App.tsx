import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './presentation/components/auth/ProtectedRoute';
import { makeLoginPage } from './main/factories/makeLoginPage';
import { UserList } from './presentation/pages/UserList';
import { BaseLayout } from './presentation/components/layout/BaseLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={makeLoginPage()} />

        <Route element={<ProtectedRoute />}>
          <Route element={<BaseLayout />}>
            <Route path="/users" element={<UserList />} />
            <Route path="/dashboard" element={
              <div className="min-h-screen bg-background flex items-center justify-center text-white">
                <h1 className="text-4xl font-bold">Dashboard (Logado com sucesso!)</h1>
              </div>
            } />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
