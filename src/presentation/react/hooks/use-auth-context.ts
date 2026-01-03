import { useContext } from 'react';
import { AuthContext } from '@/presentation/react/contexts/auth-context-base';

export const useAuthContext = () => useContext(AuthContext);
