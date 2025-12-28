import type { AuthRepository } from '../../domain/use-cases/AuthRepository';
import type { AuthSession } from '../../domain/entities/User';
import { apiClient } from '@/infrastructure/http/api-client';

export class HttpAuthRepository implements AuthRepository {
  async login(email: string, password: string): Promise<AuthSession> {
    const response = await apiClient.post('/login', { email, password });
    const { accessToken, name, role } = response.data;

    const session: AuthSession = {
      user: {
        id: name.toLowerCase().replace(/\s/g, '_'),
        email: email,
        name: name,
        role: role,
      },
      token: {
        accessToken: accessToken,
        expiresIn: 3600,
      },
    };

    localStorage.setItem('auth_session', JSON.stringify(session));
    return session;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('auth_session');
  }

  getCurrentSession(): AuthSession | undefined {
    const data = localStorage.getItem('auth_session');
    return data ? JSON.parse(data) : undefined;
  }
}
