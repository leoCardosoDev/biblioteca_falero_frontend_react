import { AuthFacade } from '@/application/facades/auth-facade';
import { RemoteAuthentication } from '@/application/usecases/remote-authentication';
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';
import { HttpAuthenticationRepository } from '@/infra/http/http-authentication-repository';
import { makeHttpClient } from '@/main/factories/http/api-client-factory';

export const makeAuthFacade = (): AuthFacade => {
  const httpClient = makeHttpClient();
  const cacheRepository = new LocalStorageAdapter();
  const httpAuthenticationRepository = new HttpAuthenticationRepository(httpClient);
  const remoteAuthentication = new RemoteAuthentication(httpAuthenticationRepository, cacheRepository);
  return new AuthFacade(remoteAuthentication, cacheRepository);
};
