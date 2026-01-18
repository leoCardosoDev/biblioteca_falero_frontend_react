export interface TokenStorage {
  getToken(): string | undefined
  setToken(token: string): void
  removeToken(): void
}

export interface HttpClient {
  get<T>(url: string): Promise<T>
  post<T, D = unknown>(url: string, data: D): Promise<T>
  put<T, D = unknown>(url: string, data: D): Promise<T>
  delete<T>(url: string): Promise<T>
}
