export interface TokenStorage {
  getToken(): string | undefined
  setToken(token: string): void
  removeToken(): void
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: unknown
  headers?: unknown
}

export type HttpResponse<T = unknown> = {
  statusCode: number
  body: T
}

export interface HttpClient {
  request<R = unknown>(data: HttpRequest): Promise<HttpResponse<R>>
  get<T>(url: string): Promise<T>
  post<T, D = unknown>(url: string, data: D): Promise<T>
  put<T, D = unknown>(url: string, data: D): Promise<T>
  delete<T>(url: string): Promise<T>
}
