import { UserModel } from '../models/user-model';

export interface AddUserParams {
  name: string;
  email: string;
  rg: string;
  cpf: string;
  birthDate: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface AddUser {
  perform: (params: AddUserParams) => Promise<UserModel>;
}
