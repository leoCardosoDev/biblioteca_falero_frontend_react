import { useContext } from 'react';
import { AuthContext } from '@/presentation/contexts/auth-context-base';

export const useAuthContext = () => useContext(AuthContext);
