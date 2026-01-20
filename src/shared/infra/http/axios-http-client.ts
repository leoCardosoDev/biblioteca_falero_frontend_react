import type {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig
} from 'axios'
import type {
  HttpClient,
  HttpRequest,
  HttpResponse
} from '@/shared/application/protocols/http/http-client'

export class AxiosHttpClient implements HttpClient {
  private readonly axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance
  }

  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await this.axiosInstance.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers as AxiosRequestConfig['headers']
      })
    } catch (error) {
      const axiosError = error as AxiosError
      axiosResponse = axiosError.response as AxiosResponse
    }
    return {
      statusCode: axiosResponse?.status || 500,
      body: axiosResponse?.data || { error: 'Network Error' }
    }
  }
}
