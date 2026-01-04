import { AddUser, AddUserParams } from '../../domain/usecases/add-user';
import { User } from '@/domain/models/user';
import { UserRepository } from '../../domain/contracts/user-repository';

export class DbAddUser implements AddUser {
  constructor(private readonly userRepository: UserRepository) { }

  async perform(params: AddUserParams): Promise<User> {
    return this.userRepository.add(params);
  }
}
