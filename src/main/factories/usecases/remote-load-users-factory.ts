import { RemoteLoadUsers } from '@/infra/http/remote-load-users';
import { LoadUsers } from '@/domain/usecases/load-users';
import { makeHttpClient } from '@/main/factories/http/api-client-factory';

export const makeRemoteLoadUsers = (): LoadUsers => {
  return new RemoteLoadUsers(makeHttpClient());
};
