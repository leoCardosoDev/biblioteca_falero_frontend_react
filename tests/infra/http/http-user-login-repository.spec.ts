import { describe, test, expect, vi } from 'vitest'
import { HttpUserLoginRepository } from '@/infra/http/http-user-login-repository'
import type {
  HttpClient,
  HttpRequest,
  HttpResponse
} from '@/application/protocols/http/http-client'
import { faker } from '@faker-js/faker'

type HttpClientSpyType = HttpClient<unknown> & {
  url?: string
  method?: string
  body?: unknown
  response: HttpResponse<unknown>
}

const makeHttpClientSpy = (): HttpClientSpyType => {
  class HttpClientSpy implements HttpClient<unknown> {
    url?: string
    method?: string
    body?: unknown
    headers?: unknown
    response: HttpResponse<unknown> = {
      statusCode: 200,
      body: {}
    }

    async request(data: HttpRequest): Promise<HttpResponse<unknown>> {
      this.url = data.url
      this.method = data.method
      this.body = data.body
      this.headers = data.headers
      return this.response
    }
  }
  return new HttpClientSpy()
}

type SutTypes = {
  sut: HttpUserLoginRepository
  httpClientSpy: HttpClientSpyType
}

const makeSut = (): SutTypes => {
  const httpClientSpy = makeHttpClientSpy()
  const sut = new HttpUserLoginRepository(httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('HttpUserLoginRepository', () => {
  test('Should call HttpClient with correct URL and body', async () => {
    const { sut, httpClientSpy } = makeSut()
    const userId = faker.string.uuid()
    const loginData = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    const params = { userId, ...loginData }

    await sut.addLogin(params)

    expect(httpClientSpy.url).toBe(`/users/${userId}/login`)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(loginData)
  })

  test('Should throw if HttpClient throws', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params = {
      userId: faker.string.uuid(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    vi.spyOn(httpClientSpy, 'request').mockRejectedValueOnce(new Error())

    const promise = sut.addLogin(params)

    await expect(promise).rejects.toThrow()
  })
})
