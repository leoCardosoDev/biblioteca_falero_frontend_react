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

export interface HttpClient<R = unknown> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}
