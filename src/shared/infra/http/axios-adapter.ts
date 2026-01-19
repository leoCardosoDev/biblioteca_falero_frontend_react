import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosResponse
} from 'axios'
import type { HttpClient, HttpRequest, HttpResponse } from './types'

const ACCESS_TOKEN_KEY = 'accessToken'
const LOGIN_PATH = '/login'

export class AxiosHttpClient implements HttpClient {
  private readonly client = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string
  })

  constructor() {
    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.retrieveStoredToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: AxiosError) => Promise.reject(error)
    )

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.handleUnauthorized()
        }
        return Promise.reject(error)
      }
    )
  }

  private retrieveStoredToken(): string | undefined {
    return localStorage.getItem(ACCESS_TOKEN_KEY) ?? undefined
  }

  private handleUnauthorized(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    window.location.href = LOGIN_PATH
  }

  async request<R>(data: HttpRequest): Promise<HttpResponse<R>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await this.client.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers as Record<string, string>
      })
    } catch (error) {
      const axiosError = error as AxiosError
      axiosResponse = axiosError.response as AxiosResponse
    }
    return {
      statusCode: axiosResponse?.status || 500,
      body: axiosResponse?.data as R
    }
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url)
    return response.data
  }

  async post<T, D = unknown>(url: string, data: D): Promise<T> {
    const response = await this.client.post<T>(url, data)
    return response.data
  }

  async put<T, D = unknown>(url: string, data: D): Promise<T> {
    const response = await this.client.put<T>(url, data)
    return response.data
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url)
    return response.data
  }

  // Helper for testing
  public getClient() {
    return this.client
  }
}

export const apiClient = new AxiosHttpClient()
