import React, { useEffect, useState, ReactNode } from 'react';
import { AuthFacade } from '@/application/facades/auth-facade';
import { AccountModel } from '@/domain/models/account-model';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { AuthContext } from './auth-context-base';

type Props = {
  children: ReactNode;
  authFacade: AuthFacade;
};

export const AuthProvider: React.FC<Props> = ({ children, authFacade }) => {
  const [user, setUser] = useState<AccountModel | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const account = await authFacade.getCurrentUser();
        if (account) {
          setUser(account);
        }
      } catch (error: unknown) {
        console.error('Failed to load account from cache:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAccount();
  }, [authFacade]);

  const login = async (params: AuthenticationParams): Promise<AccountModel | null> => {
    try {
      const account = await authFacade.login(params);
      if (account) {
        setUser(account);
      }
      return account;
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    await authFacade.logout();
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
