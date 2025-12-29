import { LoadUsers } from '../../domain/usecases/load-users';
import { UserModel } from '../../domain/models/user-model';
import { UserRepository } from '../../domain/contracts/user-repository';

export class DbLoadUsers implements LoadUsers {
  constructor(private readonly userRepository: UserRepository) { }

  async perform(): Promise<UserModel[]> {
    return this.userRepository.loadAll();
  }
}
