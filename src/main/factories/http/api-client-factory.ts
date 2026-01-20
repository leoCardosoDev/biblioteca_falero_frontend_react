import axios from 'axios'
import { AxiosHttpClient } from '@/shared/infra/http/axios-http-client'
import type { HttpClient } from '@/shared/application/protocols/http/http-client'
import { makeLocalStorageAdapter } from '@/main/factories/cache/cache-factory'
import { AuthorizeHttpClientDecorator } from '@/main/decorators/authorize-http-client-decorator'

export const makeHttpClient = (baseUrl?: string): HttpClient => {
  const instance = axios.create({
    baseURL:
      baseUrl || import.meta.env.VITE_API_URL || 'http://localhost:5050/api'
  })

  const axiosHttpClient = new AxiosHttpClient(instance)
  const localStorageAdapter = makeLocalStorageAdapter()
  return new AuthorizeHttpClientDecorator(localStorageAdapter, axiosHttpClient)
}
