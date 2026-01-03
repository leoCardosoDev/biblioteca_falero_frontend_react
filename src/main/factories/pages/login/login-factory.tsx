import React from 'react'
import { Login } from '@/presentation/react/pages'
import { RemoteAuthentication } from '@/application/usecases/remote-authentication'
import { HttpAuthenticationRepository } from '@/infra/http/http-authentication-repository'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

// Factory now fully constructs the dependency graph
export const MakeLogin: React.FC = () => {
  // In a real app, base URL might come from env
  const url = '/api/login'
  const httpAuthenticationRepository = new HttpAuthenticationRepository(url)
  const localStorageAdapter = new LocalStorageAdapter()
  const remoteAuthentication = new RemoteAuthentication(httpAuthenticationRepository, localStorageAdapter)

  return (
    <Login authentication={remoteAuthentication} />
  )
}
