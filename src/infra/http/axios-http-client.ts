import {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig
} from 'axios'
import {
  HttpClient,
  HttpRequest,
  HttpResponse
} from '@/application/protocols/http/http-client'

export class AxiosHttpClient implements HttpClient {
  constructor(private readonly axiosInstance: AxiosInstance) {}

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
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
