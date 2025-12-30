import { LoadUserById } from '@/domain/usecases/load-user-by-id';
import { UserRepository } from '@/domain/contracts/user-repository';
import { UserModel } from '@/domain/models/user-model';

export class DbLoadUserById implements LoadUserById {
  constructor(private readonly userRepository: UserRepository) { }

  async perform(id: string): Promise<UserModel> {
    return await this.userRepository.loadById(id);
  }
}
