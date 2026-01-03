export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'Administrador' | 'Bibliotecário' | 'Estudante' | 'Professor';
  status: 'Ativo' | 'Bloqueado';
  enrollmentId?: string;
}
