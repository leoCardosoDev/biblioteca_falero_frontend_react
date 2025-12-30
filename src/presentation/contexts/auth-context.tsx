import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CacheRepository } from '@/application/protocols/cache-repository';
import { AccountModel } from '@/domain/models/account-model';

type AuthContextData = {
  user: AccountModel | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (account: AccountModel) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type Props = {
  children: ReactNode;
  cacheRepository: CacheRepository;
};

export const AuthProvider: React.FC<Props> = ({ children, cacheRepository }) => {
  const [user, setUser] = useState<AccountModel | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const accountStr = await cacheRepository.get('account');
        if (accountStr) {
          setUser(JSON.parse(accountStr));
        }
      } catch (error: unknown) {
        console.error('Failed to load account from cache:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAccount();
  }, [cacheRepository]);

  const signIn = async (account: AccountModel) => {
    setUser(account);
    await cacheRepository.set('account', JSON.stringify(account));
    await cacheRepository.set('accessToken', account.accessToken);
  };

  const signOut = async () => {
    await cacheRepository.set('accessToken', '');
    await cacheRepository.set('account', '');
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
