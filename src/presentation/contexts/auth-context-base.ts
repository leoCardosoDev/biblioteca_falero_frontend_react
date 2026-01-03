import { createContext } from 'react';
import { AccountModel } from '@/domain/models/account-model';

export type AuthContextData = {
  user: AccountModel | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (account: AccountModel) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
