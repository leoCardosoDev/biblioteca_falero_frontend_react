export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  status?: 'active' | 'blocked';
  cpf?: string;
  rg?: string;
  birthDate?: string;
}

export interface AuthToken {
  accessToken: string;
  expiresIn: number;
}

export interface AuthSession {
  user: User;
  token: AuthToken;
}
