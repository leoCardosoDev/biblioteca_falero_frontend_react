import { AddUser, AddUserParams } from '../../domain/usecases/add-user';
import { UserModel } from '../../domain/models/user-model';
import { UserRepository } from '../../domain/contracts/user-repository';

export class DbAddUser implements AddUser {
  constructor(private readonly userRepository: UserRepository) { }

  async perform(params: AddUserParams): Promise<UserModel> {
    return this.userRepository.add(params);
  }
}
