import axios, { AxiosInstance } from 'axios'

export const makeHttpClient = (baseUrl?: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseUrl || import.meta.env.VITE_API_URL || 'http://localhost:5050/api'
  })

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }, (error) => {
    return Promise.reject(error)
  })


  return instance
}
