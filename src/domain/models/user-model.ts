export type UserRole = 'admin' | 'librarian' | 'user';

export type UserStatus = 'active' | 'blocked';

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface UserModel {
  id: string;
  name: string;
  email: string;
  rg: string;
  cpf: string;
  birthDate: string; // YYYY-MM-DD
  role: UserRole;
  status: UserStatus;
  enrollmentId?: string; // Optional (e.g. for students)
  avatarUrl?: string;
  address?: Address;
}
