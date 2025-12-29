import { UpdateUser, UpdateUserParams } from '../../domain/usecases/update-user';
import { UserModel } from '../../domain/models/user-model';
import { UserRepository } from '../../domain/contracts/user-repository';

export class DbUpdateUser implements UpdateUser {
  constructor(private readonly userRepository: UserRepository) { }

  async perform(params: UpdateUserParams): Promise<UserModel> {
    return this.userRepository.update(params);
  }
}
