import { User } from '../models/user';

export interface UpdateUserParams {
  id: string;
  name?: string;
  email?: string;
  rg?: string;
  cpf?: string;
  birthDate?: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  role?: User['role'];
  status?: User['status'];
}

export interface UpdateUser {
  perform: (params: UpdateUserParams) => Promise<User>;
}
