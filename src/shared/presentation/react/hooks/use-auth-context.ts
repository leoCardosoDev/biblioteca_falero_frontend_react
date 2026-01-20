import { useContext } from 'react'
import { AuthContext } from '@/shared/presentation/react/contexts/auth-context-base'

export const useAuthContext = () => useContext(AuthContext)
