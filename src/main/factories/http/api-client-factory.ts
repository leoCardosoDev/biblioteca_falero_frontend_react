import axios, { AxiosInstance } from 'axios'
import { makeLocalStorageAdapter } from '@/main/factories/cache/cache-factory'

export const makeHttpClient = (baseUrl?: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseUrl || import.meta.env.VITE_API_URL || 'http://localhost:5050/api'
  })

  instance.interceptors.request.use(async (config) => {
    const cache = makeLocalStorageAdapter()
    const token = await cache.get('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }, (error) => {
    return Promise.reject(error)
  })


  return instance
}
