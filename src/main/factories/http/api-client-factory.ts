import axios from 'axios'
import { makeLocalStorageAdapter } from '@/main/factories/cache/cache-factory'
import { HttpClient } from '@/application/protocols/http/http-client'
import { AxiosHttpClient } from '@/infra/http/axios-http-client'

export const makeHttpClient = (baseUrl?: string): HttpClient => {
  const instance = axios.create({
    baseURL:
      baseUrl || import.meta.env.VITE_API_URL || 'http://localhost:5050/api'
  })

  instance.interceptors.request.use(
    async (config) => {
      const cache = makeLocalStorageAdapter()
      const token = await cache.get('accessToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return new AxiosHttpClient(instance)
}
