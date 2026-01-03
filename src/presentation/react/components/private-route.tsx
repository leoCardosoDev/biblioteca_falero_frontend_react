import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { makeLocalStorageAdapter } from '@/main/factories/cache/cache-factory';

export const PrivateRoute: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await makeLocalStorageAdapter().get('accessToken');
      setIsAuth(!!token);
    };
    checkAuth();
  }, []);

  if (isAuth === null) {
    return null;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};
