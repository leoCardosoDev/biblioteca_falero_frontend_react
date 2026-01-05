import { RemoteLoadUserById } from '@/infra/http/remote-load-user-by-id';
import { LoadUserById } from '@/domain/usecases/load-user-by-id';
import { makeHttpClient } from '@/main/factories/http/api-client-factory';

export const makeRemoteLoadUserById = (): LoadUserById => {
  return new RemoteLoadUserById(makeHttpClient());
};
