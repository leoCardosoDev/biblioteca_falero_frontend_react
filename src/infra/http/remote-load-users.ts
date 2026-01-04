import { type AxiosInstance } from 'axios';
import { type LoadUsers } from '@/domain/usecases/load-users';
import { type User } from '@/domain/models/user';

export class RemoteLoadUsers implements LoadUsers {
  constructor(private readonly httpClient: AxiosInstance) { }

  async perform(): Promise<User[]> {
    const response = await this.httpClient.get<RemoteUser[]>('/users');
    return response.data.map(remoteUser => ({
      ...remoteUser,
      role: remoteUser.login?.role || 'STUDENT',
      // Ensure status is taken from root (as per controller) or fallback
      status: remoteUser.status || 'INACTIVE'
    }));
  }
}

interface RemoteUser extends Omit<User, 'role'> {
  role?: never; // Ensure we don't accidentally use root role if it existed (it doesn't provided it's omitted)
  login?: {
    role: User['role'];
    status: User['status'];
  } | null;
}
