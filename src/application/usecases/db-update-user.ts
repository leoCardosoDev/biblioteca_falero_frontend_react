import { UpdateUser, UpdateUserParams } from '../../domain/usecases/update-user';
import { User } from '@/domain/models/user';
import { UserRepository } from '../../domain/contracts/user-repository';

export class DbUpdateUser implements UpdateUser {
  constructor(private readonly userRepository: UserRepository) { }

  async perform(params: UpdateUserParams): Promise<User> {
    return this.userRepository.update(params);
  }
}
