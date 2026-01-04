import { type AxiosInstance } from 'axios';
import { type LoadUserById } from '@/domain/usecases/load-user-by-id';
import { type User } from '@/domain/models/user';

export class RemoteLoadUserById implements LoadUserById {
  constructor(private readonly httpClient: AxiosInstance) { }

  async perform(id: string): Promise<User> {
    const response = await this.httpClient.get<RemoteUser>(`/users/${id}`);
    const remoteUser = response.data;
    return {
      ...remoteUser,
      role: remoteUser.login?.role || 'STUDENT',
      status: remoteUser.status || 'INACTIVE'
    };
  }
}

interface RemoteUser extends Omit<User, 'role'> {
  role?: never;
  login?: {
    role: User['role'];
    status: User['status'];
  } | null;
}
