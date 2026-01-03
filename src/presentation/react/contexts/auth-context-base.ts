import { createContext } from 'react';
import { AccountModel } from '@/domain/models/account-model';

import { AuthenticationParams } from '@/domain/usecases/authentication';

export type AuthContextData = {
  user: AccountModel | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (params: AuthenticationParams) => Promise<AccountModel | null>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
