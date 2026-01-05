import { User } from '../models/user';

export interface AddUserParams {
  name: string;
  email: string;
  rg: string;
  cpf: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  role: User['role'];
  status: User['status'];
}

export interface AddUser {
  perform: (params: AddUserParams) => Promise<User>;
}
