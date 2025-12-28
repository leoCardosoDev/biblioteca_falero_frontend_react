import type { AuthSession } from '../entities/User';

export interface AuthRepository {
  login(email: string, password: string): Promise<AuthSession>;
  logout(): Promise<void>;
  getCurrentSession(): AuthSession | undefined;
}
